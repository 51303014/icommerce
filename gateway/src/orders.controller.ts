import {
  Controller,
  Inject,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { IServiceOrderCreateResponse } from './interfaces/order/service-order-create-response.interface';
import { CreateOrderResponseDto } from './interfaces/order/dto/create-order-response.dto';
import { CreateOrderDto } from './interfaces/order/dto/create-order.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderServiceClient: ClientProxy,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateOrderResponseDto,
  })
  public async createOrder(
    @Body() orderRequest: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    const createProductResponse: IServiceOrderCreateResponse = await this.orderServiceClient
      .send('order_create', {
        orderRequest,
      })
      .toPromise();

    if (createProductResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createProductResponse.message,
          data: null,
          errors: createProductResponse.errors,
        },
        createProductResponse.status,
      );
    }

    return {
      message: createProductResponse.message,
      data: {
        order: createProductResponse.order,
      },
      errors: null,
    };
  }
}
