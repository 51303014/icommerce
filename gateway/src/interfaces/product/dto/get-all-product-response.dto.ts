import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../product.interface';
import {IActivity} from "../../activity/activity.interface";

export class GetAllProductResponseDto {
  @ApiProperty({ example: 'product_get_all' })
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
  })
  data: {
    activity: IActivity;
    product: IProduct[];
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
