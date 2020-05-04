const axios = require('axios');

class Checkout {
  constructor(config, environment = 'qa', language = 'fr') {
    this.config = config;
    this.environment = environment;
    this.language = language;
    if (environment === 'qa') {
      this.url = 'https://gatewayt.moneris.com/chkt/request/request.php';
    } else {
      this.url = 'https://gateway.moneris.com/chkt/request/request.php';
    }
  }

  receipt({ ticket }) {
    const info = {
      ...this.config,
      ticket,
      environment: this.environment,
      action: 'receipt',
    };
    return axios.post(this.url, info).then(({ data }) => data.response);
  }

  preload(cart, cust_id) {
    const info = {
      ...this.config,
      cart,
      cust_id,
      txn_total: (+cart.subtotal + +cart.tax.amount).toFixed(2),
      environment: this.environment,
      action: 'preload',
      language: this.language,
    };
    return axios.post(this.url, info).then(({ data }) => data.response);
  }
}

module.exports = Checkout;
