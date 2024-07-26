import { Order } from '../order';

export class OrderCreatedEvent {
  constructor(public readonly order: Order) {}
}
