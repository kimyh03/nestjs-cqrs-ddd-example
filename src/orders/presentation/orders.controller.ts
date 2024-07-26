import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../application/commands/create-order.command';
import { FindOrderQuery } from '../application/queries/find-order.query';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.commandBus.execute(
      new CreateOrderCommand(
        createOrderDto.customerId,
        createOrderDto.shippingAddress,
        createOrderDto.orderItems,
        createOrderDto.discounts,
      ),
    );
  }

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.queryBus.execute(new FindOrderQuery(orderId));
  }
}
