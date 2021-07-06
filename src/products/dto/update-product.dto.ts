export class UpdateProductDto {
  readonly title: string;
  readonly price: number;

  constructor({
    title = 'Product default title',
    price = 111,
  }) {
    this.title = title;
    this.price = price;
  }
}
