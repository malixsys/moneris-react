import React from 'react';
import { CheckoutComponentProps } from '../interfaces';
import { defer } from '../utils';
import { Checkout } from '../checkout';

const deferred = defer();

const loadScript = function (id, test, baseUrl) {
  const url = test
    ? 'https://gatewayt.moneris.com/chkt/js/chkt_v1.00.js'
    : 'https://gateway.moneris.com/chkt/js/chkt_v1.00.js';
  try {
    delete window[`checkoutServiceLoaded`];
  } catch (e) {
    window[`checkoutServiceLoaded`] = undefined;
  }

  window[`checkoutServiceLoaded`] = function () {
    const MonerisCheckout = window['monerisCheckout'];
    const myCheckout = new MonerisCheckout();
    if (test) {
      myCheckout.setMode('qa');
    } else {
      myCheckout.setMode('prod');
    }
    myCheckout.setCheckoutDiv(id);
    deferred.resolve(new Checkout(myCheckout, baseUrl));
  };
  const olds = document.getElementsByTagName('script');
  if (olds !== null && window['monerisCheckout']) {
    try {
      delete window['monerisCheckout'];
    } catch (e) {
      window['monerisCheckout'] = undefined;
    }
    const remove = [];
    for (let i = 0; i < olds.length; i++) {
      if (olds[i].src === url) {
        remove.push(olds[i]);
      }
    }
    while (remove.length > 0) {
      const item = remove.shift();
      document.body.removeChild(item);
    }
  }
  const script = document.createElement('script');
  script.id = `${id}_script`;
  script.type = 'text/javascript';
  script.async = true;
  script.onload = window[`checkoutServiceLoaded`];
  script.src = url;
  document.body.appendChild(script);
};

const CheckoutComponent: React.FC<CheckoutComponentProps> = ({ id, test, close, loadingMessage, baseUrl }) => {
  const [service, set] = React.useState<Checkout>();
  const [status, setStatus] = React.useState('PRE');
  React.useEffect(() => {
    loadScript(id, test, baseUrl);
    deferred.promise.then((service: any) => {
      set(service);
    });
  }, [set]);

  const opened = () => {
    document.getElementById(id).style.display = 'inherit';
    document.getElementById(id + '_loader').style.display = 'none';
  };
  const start = async () => {
    const res = await service.start(opened, close);
    setStatus(res);
  };
  React.useEffect(() => {
    if (service) {
      start();
    }
  }, [service]);
  return (
    <>
      <div id={id + '_loader'}>{loadingMessage}</div>
      <div id={id} style={{ display: 'none' }}>
        ...
      </div>
    </>
  );
};

export default CheckoutComponent;
