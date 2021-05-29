import { IOrder } from './order.interface';

export interface IOrderResponse {
  status: number;
  order: IOrder | null;
  message: string;
}
