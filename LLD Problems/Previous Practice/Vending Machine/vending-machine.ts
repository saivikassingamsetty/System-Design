import { Coin, Note } from "./coin";
import { Product } from "./product";

export class VendingMachine {
  products: Product[] = [];
  coins: Coin[] = [];
  notes: Note[] = [];
  history: string[] = [];

  addProduct(products: Product[]) {
    products.forEach((product) => {
      const existingProduct = this.products.find(
        (p) => p.name === product.name
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.products.push(product);
      }
    });
  }

  insertCoins(coins: Coin[]) {
    coins.forEach((coin) => {
      const existingCoin = this.coins.find((c) => c.value === coin.value);
      if (existingCoin) {
        existingCoin.quantity += coin.quantity;
      } else {
        this.coins.push(coin);
      }
    });
  }

  insertNotes(notes: Note[]) {
    notes.forEach((note) => {
      const existingNote = this.notes.find((n) => n.value === note.value);
      if (existingNote) {
        existingNote.quantity += note.quantity;
      } else {
        this.notes.push(note);
      }
    });
  }

  display() {
    console.log(`Product Display`);
    for (let product of this.products) {
      console.log(
        `Product ${product.name} | Price ${product.price} | Quantity ${product.quantity}`
      );
    }
  }

  collectMoney(
    totalPrice: number,
    coins: Coin[],
    notes: Note[]
  ): [boolean, number] {
    // Sort the coins and notes to ensure the smallest denominations are used last
    coins.sort((a, b) => a.value - b.value);
    notes.sort((a, b) => a.value - b.value);

    let insertedAmount = 0;
    [...coins, ...notes].forEach(({ value, quantity }) => {
      insertedAmount += value * quantity;
    });

    if (insertedAmount < totalPrice) {
      return [false, 0]; // Insufficient funds
    }

    let changeToReturn = insertedAmount - totalPrice;
    let changeReturned = changeToReturn;

    for (let changeType of [...this.notes, ...this.coins]) {
      const howManyCanTake = Math.min(
        changeType.quantity,
        Math.floor(changeToReturn / changeType.value)
      );
      changeToReturn -= howManyCanTake * changeType.value;
      changeType.quantity -= howManyCanTake;
    }

    if (changeToReturn !== 0) {
      return [false, 0]; // Cannot return exact change
    }

    // If exact change can be returned
    [...coins, ...notes].forEach((money) => {
      const machineMoney = this[money instanceof Note ? "notes" : "coins"].find(
        ({ value }) => value === money.value
      );

      if (machineMoney) {
        machineMoney.quantity += money.quantity;
      }
    });

    return [true, changeReturned];
  }

  buyProduct(
    productName: string,
    quantity: number,
    coins: Coin[],
    notes: Note[]
  ) {
    const product = this.products.find((prod) => prod.name === productName);
    if (product) {
      if (product.quantity >= quantity) {
        const [isSuccessful, change] = this.collectMoney(
          product.price * quantity,
          coins,
          notes
        );

        if (isSuccessful) {
          product.quantity -= quantity;
          this.history.push(`Sold ${quantity} of ${productName}`);
          console.log(
            `Your bill is ${product.price * quantity}, here is your change ${change}`
          );
          console.log(`Visit us later`);
        } else {
          console.log(
            `Your transaction failed, please enter the correct amount`
          );
        }
      } else {
        console.log(
          `Sorry, we only have ${product.quantity} of ${productName} available`
        );
      }
    } else {
      console.log(`Sorry, ${productName} is out of stock!`);
    }
  }
}
