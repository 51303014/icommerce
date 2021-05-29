import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ActivityService } from './services/activity.service';
import { ActivitiesSchema } from './schemas/activities.schema';
import { ActivityController } from './activity.controller';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Activity',
        schema: ActivitiesSchema,
        collection: 'activities',
      },
    ]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ConfigService],
})
export class ActivityModule {}
