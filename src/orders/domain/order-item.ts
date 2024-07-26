export class OrderItem {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {}

  get subTotal() {
    return this.quantity * this.unitPrice;
  }
}
