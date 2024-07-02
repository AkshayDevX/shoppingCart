import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Product } from 'src/schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private userModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    const products = await this.userModel.find().exec();
    if (!products) {
      throw new NotFoundException('products not found');
    }
    return products;
  }

  async findOne(id: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const product = await this.userModel.findById(id).exec()

    if (!product) {
      throw new NotFoundException('product not found')
    }
    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = new this.userModel(product);
    return newProduct.save();
  }

  async deleteImage(id: string, publicId: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const updatedProduct = await this.userModel
      .findByIdAndUpdate(
        id,
        { $pull: { images: { publicId: publicId } } },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException('product not found');
    }
    return updatedProduct;
  }

  async update(id: string, updatedProduct: UpdateProductDto): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const product = await this.userModel.findByIdAndUpdate(
      id,
      {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        $push: { images: updatedProduct.images },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return product;
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    return this.userModel.findByIdAndDelete(id);
  }
}
