import * as mongoose from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: [true, 'Customer can not be empty'],
    },
    orderStatus: {
      type: String,
      required: [true, 'Order Status can not be empty'],
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
