import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  username: string;
  
  @Prop(raw([{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }]))
  products: Record<string, number>[];

  @Prop({ required: true })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export interface Order extends Document {
  id: string;
  username: string;
  totalPrice: number;
  products: Record<string, number>[];
  createdAt?: Date;
  updatedAt?: Date;
}
