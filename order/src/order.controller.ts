import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './services/order.service';
import { IOrderResponse } from './interfaces/order-response.interface';
import { IOrderRequest } from './interfaces/order.interface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('order_create')
  public async createOrder(data: {
    orderRequest: IOrderRequest;
  }): Promise<IOrderResponse> {
    let result: IOrderResponse;
    if (data.orderRequest) {
      try {
        const createResult = await this.orderService.createOrder(
          data.orderRequest,
        );
        result = {
          status: HttpStatus.CREATED,
          message: 'order_create_success',
          order: createResult,
        };
      } catch (e) {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'order_create_not_found',
          order: null,
        };
      }
    }
    return result;
  }
}
