import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 1 })
  stock: number;

  @Prop({ required: true })
  price: number;

  @Prop(raw([{ publicId: String, url: String }]))
  images: Record<string, string>[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export interface Product extends Document {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: Record<string, string>[];
  createdAt?: Date;
  updatedAt?: Date;
}
