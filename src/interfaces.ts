export interface CheckoutComponentProps {
  id: string;
  test?: boolean;
  close: () => void;
  loadingMessage: string;
  baseUrl: string;
}

export interface Item {
  description: string;
  unit_cost: string;
  quantity: string;
}

export interface Tax {
  amount: string;
  description: string;
  rate: string;
}

export interface Cart {
  items: Item[];
  subtotal: string;
  tax: Tax;
}

export interface CustInfo {
  first_name?: any;
  last_name?: any;
  phone: string;
  email: string;
}

export interface Shipping {
  address_1: string;
  address_2: string;
  city: string;
  country: string;
  province: string;
  postal_code: string;
}

export interface Cc {
  first6last4: string;
  expiry: string;
  cardholder: string;
}

export interface Request {
  txn_total: string;
  cart: Cart;
  cust_info: CustInfo;
  shipping: Shipping;
  billing?: any;
  cc_total: string;
  cc: Cc;
  ticket: string;
  cust_id: number;
  dynamic_descriptor?: any;
  order_no: string;
  eci: string;
}

export interface Secure {
  decision_origin: string;
  result: string;
  condition: string;
  status: string;
  code: string;
  details: string;
}

export interface Kount {
  decision_origin: string;
  result: string;
  condition?: any;
  status: string;
  code: string;
  details: string;
}

export interface Avs {
  decision_origin: string;
  result: string;
  condition: string;
  status: string;
  code: string;
  details: string;
}

export interface Cvd {
  decision_origin: string;
  result: string;
  condition: string;
  status: string;
  code: string;
  details: string;
}

export interface Fraud {
  kount: Kount;
  avs: Avs;
  cvd: Cvd;
}

export interface Cc3 {
  order_no: string;
  transaction_no: string;
}

export interface Verification {
  order_no: string;
}

export interface TicketHistory {
  cc: Cc3;
  verification: Verification;
}

export interface Cc2 {
  order_no: string;
  cust_id: number;
  transaction_no: string;
  reference_no: string;
  transaction_code: string;
  transaction_type: string;
  transaction_date_time: string;
  corporateCard?: any;
  amount: string;
  response_code: string;
  iso_response_code: string;
  approval_code: string;
  card_type: string;
  dynamic_descriptor?: any;
  invoice_number?: any;
  customer_code?: any;
  eci: string;
  cvd_result_code: string;
  avs_result_code?: any;
  first6last4: string;
  expiry_date: string;
  recur_success?: any;
  issuer_id?: any;
  ecr_no: string;
  batch_no: string;
  sequence_no: string;
  result: string;
  fraud: Fraud;
  ticket_history: TicketHistory;
}

export interface Receipt {
  result: string;
  cc: Cc2;
}

export interface Result {
  success: string;
  request: Request;
  receipt: Receipt;
}
