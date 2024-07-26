import { DiscountAppliedEvent } from 'src/orders/domain/events/discount-applied.event';
import { OrderCreatedEvent } from 'src/orders/domain/events/order-created.event';
import { OrderItemAddedEvent } from 'src/orders/domain/events/order-item-added.event';
import { Event } from 'src/shared/event-store/infrastructure/event-store-db.service';

export class MaterializedOrder {
  id: string;
  customerId: string;
  street: string;
  city: string;
  postalCode: string;
  totalAmount: number;
  totalDiscount: number;
  totalAmountWithDiscount: number;
  items: Array<{
    id: string;
    quantity: number;
    unitPrice: number;
  }>;
  discounts: Array<{
    id: string;
    type: string;
    value: number;
  }>;
  createdAt: string;
  eventPosition: number;

  constructor(data?: Partial<MaterializedOrder>) {
    Object.assign(this, data);
  }

  appendEvents(
    events: Event[],
    stapshot?: MaterializedOrder,
  ): MaterializedOrder {
    const aggregate = stapshot || this;
    events.forEach((event) => {
      aggregate.eventPosition = event.position;
      switch (event.type) {
        case OrderCreatedEvent.name:
          const { order } = event.data as OrderCreatedEvent;
          aggregate.id = order.id;
          aggregate.customerId = order.customerId;
          aggregate.street = order.shippingAdress.street;
          aggregate.city = order.shippingAdress.city;
          aggregate.postalCode = order.shippingAdress.postalCode;
          aggregate.items = [];
          aggregate.discounts = [];
          aggregate.createdAt = new Date(order.createdAt).toISOString();
          aggregate.totalAmount = 0;
          aggregate.totalDiscount = 0;
          aggregate.totalAmountWithDiscount = 0;
          break;
        case OrderItemAddedEvent.name:
          const { orderItem } = event.data as OrderItemAddedEvent;
          aggregate.items.push(orderItem);
          aggregate.totalAmount += orderItem.unitPrice * orderItem.quantity;
          aggregate.totalAmountWithDiscount +=
            orderItem.unitPrice * orderItem.quantity;
          break;
        case DiscountAppliedEvent.name:
          const { discount } = event.data as DiscountAppliedEvent;
          aggregate.totalDiscount += discount.value;
          aggregate.totalAmountWithDiscount -= discount.value;
          aggregate.discounts.push(discount);
          break;
      }
    });
    return aggregate;
  }
}
