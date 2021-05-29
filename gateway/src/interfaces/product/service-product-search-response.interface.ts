import { IProduct } from './product.interface';

export interface IServiceProductSearchResponse {
  status: number;
  message: string;
  product: IProduct[] | null;
}
