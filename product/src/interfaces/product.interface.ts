import { BaseModel } from '../schemas/base.model';

export class Product extends BaseModel {
  id?: string;
  name: string;
  branch: string;
  color: string;
  quantity: string;
  price: number;
}

export interface IProduct {
  id?: string;
  name: string;
  branch: string;
  color: string;
  quantity: string;
  price: number;
}
