import { Types } from 'mongoose';
import { InstanceType } from 'typegoose';
import { BaseModel } from '../schemas/base.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

export abstract class BaseService<T extends BaseModel> {
  // protected _model: ReturnModelType<T>;

  protected _model: ReturnModelType<AnyParamConstructor<T>>;

  protected constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this._model = model;
  }
  // protected _model: ModelType<T>;

  private get modelName(): string {
    return this._model.modelName;
  }

  private get viewModelName(): string {
    return `${this._model.modelName}Vm`;
  }

  async findAll(filter = {}): Promise<InstanceType<T>[]> {
    return this._model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<InstanceType<T>> {
    return this._model.findOne(filter).exec();
  }

  async findById(id: string): Promise<InstanceType<T>> {
    return this._model.findById(this.toObjectId(id)).exec();
  }

  async create(item: InstanceType<T>): Promise<InstanceType<T>> {
    return this._model.create(item);
  }

  async delete(id: string): Promise<InstanceType<T>> {
    return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
  }

  async clearCollection(filter = {}): Promise<{ ok?: number; n?: number }> {
    return this._model.deleteMany(filter).exec();
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
