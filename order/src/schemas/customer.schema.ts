import * as mongoose from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const CustomerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'FullName can not be empty'],
    },
    address: {
      type: String,
      required: [true, 'Address can not be empty'],
    },
    shippingAddress: {
      type: String,
      required: [true, 'Shipping Address can not be empty'],
    },
    postalCode: {
      type: String,
      required: [true, 'Postal Code can not be empty'],
    },
    email: {
      type: String,
      required: [true, 'Email  can not be empty'],
    },
    phone: {
      type: String,
      required: [true, 'Phone  can not be empty'],
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
