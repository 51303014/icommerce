import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../product.interface';

export class CreateProductResponseDto {
  @ApiProperty({ example: 'product_create_success' })
  message: string;
  @ApiProperty({
    example: {
      product: {
        name: 'Alphabounce',
        branch: 'Adidas',
        color: 'Blue',
        quantity: '1',
        price: 500,
        id: '5d987c3bfb881ec86b476bcc',
      },
    },
    nullable: true,
  })
  data: {
    product: IProduct;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
