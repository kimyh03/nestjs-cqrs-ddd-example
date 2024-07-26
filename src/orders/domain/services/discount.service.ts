import { Injectable } from '@nestjs/common';
import { Discount } from '../discoount';
import { Order } from '../order';

@Injectable()
export class DiscountService {
  // You can inject repositories or any other dependencies here

  applyDiscount(order: Order, discount: Discount) {
    this.validate(order, discount);
    order.applyDiscount(discount);
  }

  private validate(order: Order, discount: Discount) {
    // You can validate any business rules here
  }
}
