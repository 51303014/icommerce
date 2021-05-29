import * as mongoose from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const OrderDetailSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, 'Order can not be empty'],
    },
    productId: {
      type: String,
      required: [true, 'Product can not be empty'],
    },
    price: {
      type: Number,
      required: [true, 'Price can not be empty'],
    },
    quantity: {
      type: String,
      required: [true, 'Quantity can not be empty'],
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
