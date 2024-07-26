import { DiscountType } from 'src/orders/domain/discoount';

// In real-world scenarios, you should validate the data before using it.
export class CreateOrderDto {
  customerId: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
  };
  orderItems: Array<{
    productId: string;
    unitPrice: number;
    quantity: number;
  }>;
  discounts?: Array<{
    type: DiscountType;
    value: number;
  }>;
}
