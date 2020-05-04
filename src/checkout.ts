export class Checkout {
  private service;
  private ticket: string;
  private onClose: any;
  private baseUrl;
  private receipt: any;
  private onLoaded: any;

  constructor(service, baseUrl = '/') {
    this.service = service;
    this.baseUrl = baseUrl;
  }

  private onPageLoad(event) {
    this.onLoaded();
  }

  private onCancelTransaction(event) {
    this.close();
  }

  private close() {
    this.onClose(this.receipt);
    try {
      this.service.closeCheckout();
    } catch (e) {}
  }

  private onErrorEvent(event) {
    console.error({ onErrorEvent: event });
    this.close();
  }

  private async onPaymentReceipt(info) {
    this.receipt = await fetch(this.baseUrl + 'api/receipt', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ticket: this.ticket}),
    }).then((r) => r.json());
  }

  private onPaymentComplete(event) {
    this.close();
  }

  async start(loaded, close) {
    this.onLoaded = () => loaded();
    this.onClose = () => close();

    const { success, ticket, ...rest } = await fetch(this.baseUrl + 'api/checkout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({}),
    }).then((r) => r.json());

    if (success || success === 'true') {
      this.ticket = ticket;
      setTimeout(() => {
        this.service.setCallback('page_loaded', this.onPageLoad.bind(this));
        this.service.setCallback('cancel_transaction', this.onCancelTransaction.bind(this));
        this.service.setCallback('error_event', this.onErrorEvent.bind(this));
        this.service.setCallback('payment_receipt', this.onPaymentReceipt.bind(this));
        this.service.setCallback('payment_complete', this.onPaymentComplete.bind(this));

        this.service.startCheckout(ticket);
      }, 10);

      return 'OK';
    }
    this.close();
    return 'FAIL';
  }
}
