import { Coin, Note } from "./coin";
import { Product } from "./product";
import { VendingMachine } from "./vending-machine";

// Create a vending machine instance
const vendingMachine = new VendingMachine();

// Define some products
const milk = new Product("milk", 30, 5);
const chocolate = new Product("chocolate", 100, 10);
const drink = new Product("drink", 20, 10);
const soda = new Product("soda", 150, 5);
const chips = new Product("chips", 50, 20);

// Add products to the vending machine
vendingMachine.addProduct([milk, chocolate, drink, soda, chips]);

// Insert some coins and notes into the machine
const coins = [new Coin(5, 10), new Coin(10, 10), new Coin(25, 5)];
const notes = [new Note(50, 2), new Note(100, 1)];

vendingMachine.insertCoins(coins);
vendingMachine.insertNotes(notes);

// Display available products
vendingMachine.display();

// Attempt to buy products
console.log("\nAttempting to buy products...");

// Try purchasing chocolate
vendingMachine.buyProduct(
  "chocolate",
  2,
  [new Coin(25, 4)],
  [new Note(100, 1)]
);

// Try buying more chips than available
vendingMachine.buyProduct("chips", 25, [new Coin(5, 10)], []);

// Try buying soda with insufficient funds
vendingMachine.buyProduct("soda", 1, [new Coin(5, 1), new Coin(10, 2)], []);

// Final check on products after transactions
console.log("\nFinal Products Display:");
vendingMachine.display();

// Show transaction history
console.log("\nTransaction History:");
console.log(vendingMachine.history.join("\n"));
