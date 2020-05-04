const express = require('express');
const Checkout = require('../src/server/checkout');
const config = {
  checkout_id: process.env.STORYBOOK_MONERIS_CHECKOUT,
  api_token: process.env.STORYBOOK_MONERIS_API,
  store_id: process.env.STORYBOOK_MONERIS_STORE,
};
const environment = 'prod'; //'qa';
const checkout = new Checkout(config, environment);

const cart = {
  items: [
    {
      // url: 'https://example.com/examples/item1.jpg',
      description: 'One item',
      // product_code: 'one_item',
      unit_cost: '0.01',
      quantity: '1',
    },
    {
      // url: 'https://example.com/examples/item2.jpg',
      description: 'Two item',
      // product_code: 'two_item',
      unit_cost: '0.02',
      quantity: '1',
    },
    {
      // url: 'https://example.com/examples/item3.jpg',
      description: 'Three item',
      // product_code: 'three_item',
      unit_cost: '0.03',
      quantity: '1',
    },
  ],
  subtotal: '0.06',
  tax: {
    amount: '0.02',
    description: 'Taxes',
    rate: '14.975',
  },
};

module.exports = function expressMiddleware(router) {
  router.post('/api/receipt', express.json(), async (req, res) =>
    checkout
      .receipt(req.body)
      .then(
        /**
         * @param {Result}
         *
         * */
        ({ success, request, receipt }) => {
          // handle result
          console.log(JSON.stringify({ success, request, receipt }, null, 2));
          return res.json({ success, order_no: receipt.cc.order_no });
        }
      )
      .catch((error) => {
        console.error(error);
        res.status(500).json({ success: false });
      })
  );

  router.post('/api/checkout', express.json(), async (req, res) =>
    checkout
      .preload(cart, new Date().getTime())
      .then((result) => res.json(result))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ success: false });
      })
  );
};
