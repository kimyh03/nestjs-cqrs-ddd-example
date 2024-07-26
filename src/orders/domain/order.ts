import { AggregateRootWithId } from 'src/core/domain/aggregate-root';
import { Discount } from './discoount';
import { DiscountAppliedEvent } from './events/discount-applied.event';
import { OrderItemAddedEvent } from './events/order-item-added.event';
import { OrderItem } from './order-item';
import { Adress } from './value-objects/adress';

export type OrderStatus = 'Pending' | 'Paid';

export class Order extends AggregateRootWithId {
  public shippingAdress: Adress;
  public orderItems: OrderItem[] = [];
  public discounts: Discount[] = [];
  public status: OrderStatus = 'Pending';
  public createdAt: Date;
  constructor(public readonly id: string, public readonly customerId: string) {
    super();
  }
  addOrderItem(orderItem: OrderItem) {
    if (this.status !== 'Pending') {
      throw new Error('Cannot add order item to a paid order');
    }
    if (this.orderItems.some((item) => item.id === orderItem.id)) {
      throw new Error('Order item already added');
    }
    this.orderItems.push(orderItem);
    this.apply(new OrderItemAddedEvent(this.id, orderItem));
  }
  applyDiscount(discount: Discount) {
    if (this.status !== 'Pending') {
      throw new Error('Cannot apply discount to a paid order');
    }
    if (this.discounts.some((d) => d.id === discount.id)) {
      throw new Error('Discount already applied');
    }
    this.discounts.push(discount);
    this.apply(new DiscountAppliedEvent(this.id, discount));
  }
  // pay() {}
  // ship() {}
  // cancel() {}
  // refund() {}
  // complete() {}
  // ...
}
