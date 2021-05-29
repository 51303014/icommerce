import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';
import { ConfigService } from './services/config/config.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/exception.filter';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [ProductsController, OrdersController],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: 'ACTIVITY_SERVICE',
      useFactory: (configService: ConfigService) => {
        const activityServiceOptions = configService.get('activityService');
        return ClientProxyFactory.create(activityServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const productServiceOptions = configService.get('productService');
        return ClientProxyFactory.create(productServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('orderService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
