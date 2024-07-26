import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderCommandRepository } from 'src/orders/application/ports/order.command-repository';
import { Order } from 'src/orders/domain/order';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderMapper } from '../mappers/order.mapper';

@Injectable()
export class OrderCommandRepositoryImplement implements OrderCommandRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async save(order: Order): Promise<void> {
    const orderEntity: OrderEntity = OrderMapper.toPersistence(order);
    const newOrder = await this.orderRepository.save(orderEntity);
    console.log('Order saved: ', newOrder);
  }
}
