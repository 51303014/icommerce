import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './services/product.service';
import { IProduct } from './interfaces/product.interface';
import { IProductCreateResponse } from './interfaces/product-create-response.interface';
import { IProductResponse } from './interfaces/product-response.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('product_search')
  public async searchProduct(searchParams: {
    name: string;
    branch: string;
    color: string;
    price: number;
  }): Promise<IProductResponse> {
    let result: IProductResponse;
    let options = {};
    if (
      searchParams.name ||
      searchParams.branch ||
      searchParams.color ||
      searchParams.price
    ) {
      options = {
        $or: [
          {
            name: searchParams.name,
          },
          {
            branch: searchParams.branch,
          },
          {
            color: searchParams.color,
          },
          {
            price: searchParams.price,
          },
        ],
      };
      const product = await this.productService.searchProduct(options);

      if (product) {
        result = {
          status: HttpStatus.OK,
          message: 'product_search_success',
          product: product,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'product_search_not_found',
          product: null,
        };
      }
      return result;
    }
  }

  @MessagePattern('product_get_all')
  public async getProductAll(): Promise<IProductResponse> {
    let result: IProductResponse;
    const product = await this.productService.getProductAll();
    if (product) {
      result = {
        status: HttpStatus.OK,
        message: 'get_all_product_success',
        product: product,
      };
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'get_all_product_not_found',
        product: null,
      };
    }
    return result;
  }
  @MessagePattern('filter_product')
  public async filterProduct(data: {
    name: string;
    branch: string;
    color: string;
    price: number;
    sortBy: string;
  }): Promise<IProductResponse> {
    let result: IProductResponse;
    let options = {};
    if (data.name || data.branch || data.color || data.price) {
      options = {
        $or: [
          {
            name: data.name,
          },
          {
            branch: data.branch,
          },
          {
            color: data.color,
          },
          {
            price: data.price,
          },
        ],
      };
    }
    const product = await this.productService.filterProduct(
      options,
      data.sortBy,
    );
    if (product) {
      result = {
        status: HttpStatus.OK,
        message: 'product_filter_success',
        product,
      };
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'product_filter_not_found',
        product: null,
      };
    }
    return result;
  }

  @MessagePattern('product_create')
  public async createProduct(
    productParams: IProduct,
  ): Promise<IProductCreateResponse> {
    let result: IProductCreateResponse;

    if (productParams) {
      try {
        const createdProduct = await this.productService.createProduct(
          productParams,
        );

        result = {
          status: HttpStatus.CREATED,
          message: 'product_create_success',
          product: createdProduct,
          errors: null,
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'product_create_precondition_failed',
          product: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'product_create_bad_request',
        product: null,
        errors: null,
      };
    }

    return result;
  }
}
