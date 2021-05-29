import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, IActivity } from '../interfaces/activity.interface';
import { BaseService } from './base.service';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ActivityService extends BaseService<Activity> {
  constructor(
    @InjectModel(Activity.modelName)
    private readonly activityModel: ReturnModelType<typeof Activity>,
  ) {
    super(activityModel);
  }

  public async createActivity(activityBody: IActivity): Promise<IActivity> {
    const activityModel = new this.activityModel(activityBody);
    return await activityModel.save();
  }
}
