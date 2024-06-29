import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private userModel: Model<Product>) {}

    async findAll(): Promise<Product[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        return this.userModel.findById(id).exec();
    }

    async create(product: CreateProductDto): Promise<Product> {
        const newProduct = new this.userModel(product);
        return newProduct.save();
    }

}
