import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // find all orders for admin
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  // create a new order
  @Post()
  async create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }
}
