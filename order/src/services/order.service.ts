import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Customer,
  ICustomer,
  IOrder,
  IOrderRequest,
  Order,
  OrderDetails,
} from '../interfaces/order.interface';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    @InjectModel('OrderDetail')
    private readonly orderDetailModel: Model<OrderDetails>,
  ) {}

  public async createOrder(data: IOrderRequest): Promise<IOrder> {
    const customerData: ICustomer = {
      fullName: data.fullName,
      address: data.address,
      shippingAddress: data.shippingAddress,
      postalCode: data.postalCode,
      email: data.email,
      phone: data.phone,
    };
    const customerModel = new this.customerModel(customerData);
    const customer = await customerModel.save();
    const order = await new this.orderModel({
      customerId: customer.id,
      orderStatus: 'PENDING',
    }).save();
    await new this.orderDetailModel({
      orderId: order.id,
      productId: data.productId,
      quantity: data.quantity,
      price: data.price,
    }).save();
    return order;
  }
}
