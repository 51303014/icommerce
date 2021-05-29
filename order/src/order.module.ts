import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { OrderSchema } from './schemas/order.schema';
import { OrderDetailSchema } from './schemas/order-details.schema';
import { CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
        collection: 'orders',
      },
      {
        name: 'Customer',
        schema: CustomerSchema,
        collection: 'customers',
      },
      {
        name: 'OrderDetail',
        schema: OrderDetailSchema,
        collection: 'order_details',
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
