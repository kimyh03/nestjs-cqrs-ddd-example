export class Adress {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly postalCode: string,
  ) {}

  equals(adress: Adress): boolean {
    return (
      this.street === adress.street &&
      this.city === adress.city &&
      this.postalCode === adress.postalCode
    );
  }
}
