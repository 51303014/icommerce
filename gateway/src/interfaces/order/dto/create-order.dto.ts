import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'PENDING' })
  orderStatus: string;
  @ApiProperty({ example: '5d987c3bfb881ec86b476bca' })
  customerId: string;
  @ApiProperty({ example: 'Peter Bi' })
  fullName: string;
  @ApiProperty({ example: 'California' })
  address: string;
  @ApiProperty({ example: 'California' })
  shippingAddress: string;
  @ApiProperty({ example: '7000000' })
  postalCode: string;
  @ApiProperty({ example: 'bih@gmail.com' })
  email: string;
  @ApiProperty({ example: '0987312321' })
  phone: string;
  @ApiProperty({ example: 599 })
  price: number;
  @ApiProperty({ example: '5d987c3bfb881ec86b312321f' })
  productId: string;
  @ApiProperty({ example: '2' })
  quantity: string;
}
