import {
    IsString,
    IsNumber,
  } from 'class-validator';
  export class CreateOrderDto {
    @IsString()
    username: string;

    products: Record<string, number>[];
  
    @IsNumber()
    totalPrice: Number; 
  }
  