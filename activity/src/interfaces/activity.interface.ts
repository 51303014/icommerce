import { ActivityAction } from '../const';
import { BaseModel } from '../schemas/base.model';

export class Activity extends BaseModel {
  id?: string;
  product_id: [];
  action: ActivityAction;
}

export interface IActivity {
  product_id: [];
  action: ActivityAction;
}
