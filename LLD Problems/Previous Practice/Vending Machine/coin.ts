export class Change {
  value: number;
  quantity: number;

  constructor(value: number, quantity: number) {
    this.value = value;
    this.quantity = quantity;
  }
}

export class Coin extends Change {}

export class Note extends Change {}
