import { IProduct } from './product.interface';

export interface IServiceFilterProductResponse {
  status: number;
  message: string;
  product: IProduct[] | null;
  errors: { [key: string]: any };
}
