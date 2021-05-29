import { ApiProperty } from '@nestjs/swagger';

export class ProductSearchDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'Alphabounce',
  })
  name: string;
  @ApiProperty({
    minLength: 50,
    example: 'Adidas',
  })
  branch: string;
  @ApiProperty({
    minLength: 50,
    example: 'Blue',
  })
  color: string;
  @ApiProperty({
    minLength: 10,
    example: '1',
  })
  quantity: string;
  @ApiProperty({
    minLength: 10,
    example: 500,
  })
  price: number;
}
