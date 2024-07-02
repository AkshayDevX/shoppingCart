import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schema/orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/schema/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    const products = createOrderDto.products;

    const bulkOps = products.map((product) => ({
      updateOne: {
        filter: { _id: product.productId },
        update: { $inc: { stock: -product.quantity } },
      },
    }));
    await this.productModel.bulkWrite(bulkOps);

    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('products.productId').exec();
  }
}
