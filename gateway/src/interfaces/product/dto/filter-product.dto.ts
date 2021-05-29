import { ApiProperty } from '@nestjs/swagger';

export class FilterProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  branch: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  color: string;
}
export enum EnumProduct {
  NAME = 'name',
  BRANCH = 'branch',
  COLOR = 'color',
  PRICE = 'price',
}
