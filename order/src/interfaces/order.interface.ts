import { Document } from 'mongoose';

export class Order extends Document {
  id?: string;
  customerId: string;
  orderStatus: string;
}
export class Customer extends Document {
  id?: string;
  fullName: string;
  address: string;
  shippingAddress: string;
  postalCode: string;
  email: string;
  phone: string;
}
export class OrderDetails extends Document {
  id?: string;
  orderId: string;
  productId: string;
  quantity: string;
  price: number;
}

export interface IOrder {
  id?: string;
  customerId: string;
  orderStatus: string;
}

export interface IOrderRequest {
  id?: string;
  fullName: string;
  address: string;
  shippingAddress: string;
  postalCode: string;
  email: string;
  phone: string;
  orderStatus: string;
  productId: string;
  price: number;
  quantity: string;
}

export interface ICustomer {
  id?: string;
  fullName: string;
  address: string;
  shippingAddress: string;
  postalCode: string;
  email: string;
  phone: string;
}

export interface IOrderDetails {
  id?: string;
  orderId: string;
  productId: string;
  quantity: string;
  price: number;
}
