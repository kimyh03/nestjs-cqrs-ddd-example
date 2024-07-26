import { QueryHandler } from '@nestjs/cqrs';
import { EventStore } from 'src/core/application/ports/event-store.service';
import { inspect } from 'util';
import { MaterializedOrder } from '../materialized/order.materialized-model';
import { OrderQueryRepository } from '../ports/order.query-repository';
import { FindOrderQuery } from './find-order.query';

@QueryHandler(FindOrderQuery)
export class FindOrderQueryHandler {
  constructor(
    private readonly orderRepository: OrderQueryRepository,
    private readonly eventStore: EventStore,
  ) {}

  async execute(query: FindOrderQuery) {
    const order = new MaterializedOrder(
      await this.orderRepository.findById(query.orderId),
    );
    console.log('Order found from read-db');
    console.log(inspect({ order }, { depth: null }));

    const events = await this.eventStore.getEvents(
      query.orderId,
      order.eventPosition ? order.eventPosition + 1 : 0,
    );
    console.log('Events found from event-store');
    console.log(inspect({ events }, { depth: null }));

    if (events.length) {
      order.appendEvents(events, order);
      await this.orderRepository.save(order);
    }

    return order;
  }
}
