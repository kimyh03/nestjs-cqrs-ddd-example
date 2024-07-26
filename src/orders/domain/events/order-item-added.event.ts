import { OrderItem } from '../order-item';

export class OrderItemAddedEvent {
  constructor(
    public readonly orderId: string,
    public readonly orderItem: OrderItem,
  ) {}
}
