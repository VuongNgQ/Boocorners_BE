import type { Product } from './product';
import type { IDateValue, IDatePickerControl } from './common';

// -------------------------  USE ------------------------------------------
export type OrderStatus = 'PROCESSING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'CANCELED';

export type Payment = {
  id: number;
  order: string;
  paymentMethod: string;
  amount: number;
  paymentStatus: PaymentStatus;
};
export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  cart: string;
};
export type Order = {
  id: number;
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  dateCreated: string;
  lastUpdated: string;
  orderStatus: OrderStatus;
  deliveryDate: any;
  paidAmount: number;
  cart: {
    id: number;
    items: CartItem[];
    totalPrice: number;
  };
  payment?: Payment;
  customerInfo?: Customer;
  prepaid: boolean;
};

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export type ICustomerCheckout = {
  fullName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
};

// ----------------------------------------------------------------------

export type IOrderTableFilters = {
  name: string;
  status: string;
  startDate: IDatePickerControl;
  endDate: IDatePickerControl;
};

export type IOrderHistory = {
  orderTime: IDateValue;
  paymentTime: IDateValue;
  deliveryTime: IDateValue;
  completionTime: IDateValue;
  timeline: { title: string; time: IDateValue }[];
};

export type IOrderShippingAddress = {
  fullAddress: string;
  phoneNumber: string;
};

export type IOrderPayment = {
  cardType: string;
  cardNumber: string;
};

export type IOrderDelivery = {
  shipBy: string;
  speedy: string;
  trackingNumber: string;
};

export type IOrderCustomer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  ipAddress: string;
};

export type IOrderProductItem = {
  id: string;
  sku: string;
  name: string;
  price: number;
  coverUrl: string;
  quantity: number;
};

export type IOrderItem = {
  id: string;
  taxes: number;
  status: string;
  shipping: number;
  discount: number;
  subtotal: number;
  orderNumber: string;
  totalAmount: number;
  totalQuantity: number;
  createdAt: IDateValue;
  history: IOrderHistory;
  payment: IOrderPayment;
  customer: IOrderCustomer;
  delivery: IOrderDelivery;
  items: IOrderProductItem[];
  shippingAddress: IOrderShippingAddress;
};
