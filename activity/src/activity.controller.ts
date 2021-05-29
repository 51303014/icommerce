import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ActivityService } from './services/activity.service';
import { IActivityCreateResponse } from './interfaces/activity-create-response.interface';
import { IActivity } from './interfaces/activity.interface';
import { ActivityAction } from './const';
import { LoggerService } from './logger/logger.service';
import { Logger } from './logger/logger.decorator';

@Controller('activity')
export class ActivityController {
  constructor(
    @Logger('AppService') private logger: LoggerService,
    private readonly activityService: ActivityService,
  ) {}

  @MessagePattern('activity_create')
  public async activityCreate(data: {
    productId: [];
    action: ActivityAction;
  }): Promise<IActivityCreateResponse> {
    let result: IActivityCreateResponse;
    const activityBody: IActivity = {
      product_id: data.productId,
      action: data.action,
    };
    if (activityBody) {
      try {
        const activity = await this.activityService.createActivity(
          activityBody,
        );
        result = {
          status: HttpStatus.CREATED,
          message: 'activity_create_success',
          activity,
          errors: null,
        };
      } catch (e) {
        this.logger.log(e.errors);
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'activity_create_bad_request',
          activity: null,
          errors: e.errors,
        };
      }
    }
    return result;
  }
}
