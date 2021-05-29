import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../product.interface';

export class FilterProductResponseDto {
  @ApiProperty({ example: 'filter_product_success' })
  message: string;
  @ApiProperty({
    example: [
      {
        name: 'Alphabounce',
        branch: 'Adidas',
        color: 'Blue',
        quantity: '1',
        price: 500,
        id: '5d987c3bfb881ec86b476bcc',
      },
    ],
    nullable: true,
    type: 'null',
  })
  data: IProduct[];
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
