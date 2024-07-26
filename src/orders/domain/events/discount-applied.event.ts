import { Discount } from '../discoount';

export class DiscountAppliedEvent {
  constructor(
    public readonly orderId: string,
    public readonly discount: Discount,
  ) {}
}
