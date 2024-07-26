import { CommandHandler } from '@nestjs/cqrs';
import { OrderFactory } from 'src/orders/domain/factories/order.factory';
import { OrderCommandRepository } from '../ports/order.command-repository';
import { CreateOrderCommand } from './create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler {
  constructor(
    private readonly orderRepository: OrderCommandRepository,
    private readonly orderFactory: OrderFactory,
  ) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    const order = this.orderFactory.create(
      command.customerId,
      command.shippingAddress,
      command.orderItems,
      command.discounts,
    );
    await this.orderRepository.save(order);
    order.commit();
  }
}
