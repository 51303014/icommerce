import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order.interface';

export class CreateOrderResponseDto {
  @ApiProperty({ example: 'order_create_success' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        orderStatus: 'PENDING',
        customerId: '5d987c3bfb881ec86b476bca',
        created_at: +new Date(),
        updated_at: +new Date(),
        id: '5d987c3bfb881ec86b476bcc',
      },
    },
    nullable: true,
  })
  data: {
    order: IOrder;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
