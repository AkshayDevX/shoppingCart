import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async deleteImage(id: string, publicId: string): Promise<Product> {
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
    return this.userModel.findByIdAndDelete(id);
  }
}
