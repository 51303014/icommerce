import * as mongoose from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export interface IProductSchema extends mongoose.Document {
  name: string;
  branch: string;
  color: string;
  quantity: string;
  price: number;
}

export const ProductSchema = new mongoose.Schema<IProductSchema>(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    branch: {
      type: String,
      required: [true, 'Branch can not be empty'],
    },
    color: {
      type: String,
      required: [true, 'Color can not be empty'],
    },
    quantity: {
      type: String,
      required: [true, 'Quantity can not be empty'],
    },
    price: {
      type: Number,
      required: [true, 'Price can not be empty'],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);
ProductSchema.index({ name: 'text', branch: 'text', price: -1 });
