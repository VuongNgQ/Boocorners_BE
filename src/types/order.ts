import type { Product } from './product';
import type { Customer } from './customer';

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

export type ICustomerCheckout = {
  fullName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
};
