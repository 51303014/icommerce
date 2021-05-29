import { IProduct } from './product.interface';

export interface IProductResponse {
  status: number;
  message: string;
  product: IProduct[] | null;
}
