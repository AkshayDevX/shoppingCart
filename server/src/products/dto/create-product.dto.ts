import {
  IsString,
  IsNumber,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  stock: Number;

  @IsNumber()
  price: Number;

  images: Record<string, string>[];

}
