import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct, Product } from '../interfaces/product.interface';
import { BaseService } from './base.service';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.modelName)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {
    super(productModel);
  }

  public async searchProduct(options = {}): Promise<IProduct[]> {
    return this.productModel.find(options).exec();
  }

  public async getProductAll(): Promise<IProduct[]> {
    return this.productModel.find({}).exec();
  }

  public async filterProduct(
    options = {},
    sortBy: string,
  ): Promise<IProduct[]> {
    const sortProduct = {
      price: sortBy.includes('-') ? -1 : 1,
    };
    return this.productModel.find(options).sort(sortProduct).exec();
  }

  public async searchProductById(id: string): Promise<IProduct> {
    return this.productModel.findById(id).exec();
  }

  public async createProduct(Product: IProduct): Promise<IProduct> {
    const productModel = new this.productModel(Product);
    return await productModel.save();
  }
}
