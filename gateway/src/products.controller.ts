import {
  Controller,
  Post,
  Get,
  Body,
  Inject,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {ApiTags, ApiOkResponse, ApiCreatedResponse, ApiProperty} from '@nestjs/swagger';
import { IServiceProductCreateResponse } from './interfaces/product/service-product-create-response.interface';
import { IServiceFilterProductResponse } from './interfaces/product/service-filter-product-response.interface';
import { GetAllProductResponseDto } from './interfaces/product/dto/get-all-product-response.dto';
import { CreateProductDto } from './interfaces/product/dto/create-product.dto';
import { CreateProductResponseDto } from './interfaces/product/dto/create-product-response.dto';
import { FilterProductResponseDto } from './interfaces/product/dto/filter-product-response.dto';
import { ProductSearchResponseDto } from './interfaces/product/dto/product-search-response.dto';
import { IServiceProductSearchResponse } from './interfaces/product/service-product-search-response.interface';
import { ActivityAction } from './const';
import { IServiveActivityCreateResponse } from './interfaces/activity/service-activity-create-response.interface';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(
    @Inject('ACTIVITY_SERVICE')
    private readonly activityServiceClient: ClientProxy,
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetAllProductResponseDto,
  })
  public async getProductAll(): Promise<GetAllProductResponseDto> {
    const productResponse: IServiceFilterProductResponse = await this.productServiceClient
      .send('product_get_all', {})
      .toPromise();
    const activityResponse: IServiveActivityCreateResponse = await this.activityServiceClient
      .send('activity_create', {
        productId: productResponse && productResponse.product.map((v) => v.id),
        action: ActivityAction.VIEWING,
      })
      .toPromise();
    return {
      message: productResponse.message,
      data: {
        activity: activityResponse.activity,
        product: productResponse.product,
      },
      errors: null,
    };
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateProductResponseDto,
  })
  public async createProduct(
    @Body() userRequest: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    const createProductResponse: IServiceProductCreateResponse = await this.productServiceClient
      .send('product_create', userRequest)
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
        product: createProductResponse.product,
      },
      errors: null,
    };
  }

  @Get('/search')
  @ApiCreatedResponse({
    type: ProductSearchResponseDto,
  })
  @ApiProperty({ required: false })
  public async searchProduct(
    @Query('name') name?: string,
    @Query('branch') branch?: string,
    @Query('color') color?: string,
    @Query('price') price?: number,
  ): Promise<ProductSearchResponseDto> {
    const getProductResponse: IServiceProductSearchResponse = await this.productServiceClient
      .send('product_search', {
        name,
        branch,
        color,
        price,
      })
      .toPromise();

    const activityResponse: IServiveActivityCreateResponse = await this.activityServiceClient
      .send('activity_create', {
        productId:
          getProductResponse && getProductResponse.product.map((v) => v.id),
        action: ActivityAction.SEARCHING,
      })
      .toPromise();

    if (getProductResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getProductResponse.message,
          data: null,
          errors: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: getProductResponse.message,
      data: {
        activity: activityResponse.activity,
        product: getProductResponse.product,
      },
      errors: null,
    };
  }

  @Get('/filter')
  @ApiCreatedResponse({
    type: FilterProductResponseDto,
  })
  @ApiProperty({ required: false })
  public async filterProduct(
    @Query('name') name?: string,
    @Query('branch') branch?: string,
    @Query('color') color?: string,
    @Query('price') price?: number,
    @Query('sortBy') sortBy?: string,
  ): Promise<FilterProductResponseDto> {
    const responseFilter: IServiceFilterProductResponse = await this.productServiceClient
      .send('filter_product', {
        name,
        branch,
        color,
        price,
        sortBy,
      })
      .toPromise();
    await this.activityServiceClient
      .send('activity_create', {
        productId: responseFilter && responseFilter.product.map((v) => v.id),
        action: ActivityAction.FILTERING,
      })
      .toPromise();
    if (responseFilter.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: responseFilter.message,
          data: null,
          errors: responseFilter.errors,
        },
        responseFilter.status,
      );
    }

    return {
      message: responseFilter.message,
      errors: null,
      data: responseFilter.product,
    };
  }
}
