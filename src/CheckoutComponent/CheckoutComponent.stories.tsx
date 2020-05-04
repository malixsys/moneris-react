import React from 'react';
import CheckoutComponent from './CheckoutComponent';

export default {
  title: 'CheckoutComponent',
};

export const Primary = () => {
  const [open, setOpen] = React.useState(true);
  const close = () => {
    setOpen(false);
  };
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <h1 style={{ position: 'fixed', top: 10, right: 10 }}>Checkout</h1>
      {open && <CheckoutComponent id={'monerisCheckout'} close={close} loadingMessage={'Un instant...'} baseUrl={'/'}/>}
      {!open && <button onClick={() => setOpen(true)}>Checkout</button>}
    </div>
  );
};
