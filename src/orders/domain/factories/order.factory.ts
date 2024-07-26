import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { Discount, DiscountType } from '../discoount';
import { OrderCreatedEvent } from '../events/order-created.event';
import { Order } from '../order';
import { OrderItem } from '../order-item';
import { DiscountService } from '../services/discount.service';
import { Adress } from '../value-objects/adress';

@Injectable()
export class OrderFactory {
  constructor(
    private readonly discountService: DiscountService,
    private readonly eventPublisher: EventPublisher,
  ) {}
  create(
    customerId: string,
    shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
    },
    orderItems: Array<{
      productId: string;
      unitPrice: number;
      quantity: number;
    }>,
    discounts?: Array<{
      type: DiscountType;
      value: number;
    }>,
  ): Order {
    const order = new Order(randomUUID(), customerId);
    order.status = 'Pending';
    order.createdAt = new Date();
    this.eventPublisher.mergeObjectContext(order);
    order.apply(new OrderCreatedEvent(order));

    order.shippingAdress = new Adress(
      shippingAddress.street,
      shippingAddress.city,
      shippingAddress.postalCode,
    );
    orderItems
      .map(
        (item) =>
          new OrderItem(
            randomUUID(),
            item.productId,
            item.unitPrice,
            item.quantity,
          ),
      )
      .forEach((item) => order.addOrderItem(item));
    discounts
      .map(
        (discount) => new Discount(randomUUID(), discount.type, discount.value),
      )
      .forEach((discount) => {
        this.discountService.applyDiscount(order, discount);
      });

    return order;
  }
}
