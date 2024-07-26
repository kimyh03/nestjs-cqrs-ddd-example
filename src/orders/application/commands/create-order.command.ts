import { DiscountType } from 'src/orders/domain/discoount';

export class CreateOrderCommand {
  constructor(
    public readonly customerId: string,
    public readonly shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
    },
    public readonly orderItems: Array<{
      productId: string;
      unitPrice: number;
      quantity: number;
    }>,
    public readonly discounts?: Array<{
      type: DiscountType;
      value: number;
    }>,
  ) {}
}
