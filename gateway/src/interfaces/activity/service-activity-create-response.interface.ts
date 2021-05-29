import { IActivity } from './activity.interface';

export interface IServiveActivityCreateResponse {
  status: number;
  activity: IActivity | null;
  message: string;
  errors: { [key: string]: any };
}
