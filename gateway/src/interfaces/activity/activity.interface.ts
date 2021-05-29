import { ActivityAction } from '../../const';

export interface IActivity {
  data: {
    productId: [];
    action: ActivityAction;
  };
}
