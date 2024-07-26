import { AggregateRoot } from '@nestjs/cqrs';

export const discountType = ['percentage', 'fixed'] as const;
export type DiscountType = (typeof discountType)[number];

export class Discount extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly type: DiscountType,
    public readonly value: number,
  ) {
    super();
  }
}
