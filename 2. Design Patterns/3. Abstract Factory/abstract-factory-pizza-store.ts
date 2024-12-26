enum PizzaType {
  Cheese = "cheese",
  Chicken = "chicken",
  Default = "default",
}

//main interfaces for ingredients
interface Toppings {}
interface Dough {}
interface Sauce {}
interface Cheese {}
interface Veggies {}
interface Pepperoni {}
interface Clams {}
interface Chicken {}

//sub ingredients
class ThinCrustDough implements Dough {}
class MarinaraSauce implements Sauce {}
class ReggianoCheese implements Cheese {}
class Garlic implements Veggies {}
class Onion implements Veggies {}
class Mushroom implements Veggies {}
class RedPepper implements Veggies {}
class SlicedPepperoni implements Pepperoni {}
class FreshClams implements Clams {}
class BroilerChicken implements Chicken {}

interface PizzaIngredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
  createVeggies(): Veggies[];
  createPepperoni(): Pepperoni;
  createClam(): Clams;
  createChicken(): Chicken;
}

class IndianPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): Dough {
    return new ThinCrustDough();
  }

  createSauce(): Sauce {
    return new MarinaraSauce();
  }

  createCheese(): Cheese {
    return new ReggianoCheese();
  }

  createVeggies(): Veggies[] {
    const veggies = [
      new Garlic(),
      new Onion(),
      new RedPepper(),
      new Mushroom(),
    ];
    return veggies;
  }

  createPepperoni(): Pepperoni {
    return new SlicedPepperoni();
  }

  createClam(): Clams {
    return new FreshClams();
  }

  createChicken(): Chicken {
    return new BroilerChicken();
  }
}

abstract class Pizza {
  name: string;
  dough: Dough;
  sauce: Sauce;
  toppings: Toppings = [];
  veggies: Veggies;
  cheese: Cheese;
  pepperoni: Pepperoni;
  clams: Clams;
  chicken: Chicken;

  abstract prepare(): void;

  bake() {
    console.log("Baking at 100 heat ...");
  }

  cut() {
    console.log("Cutting the pizza");
  }

  box() {
    console.log("Placing in the box");
  }

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}

class CheesePizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;

  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }

  prepare(): void {
    console.log("Preparing", this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
    this.veggies = this.ingredientFactory.createVeggies();
  }
}

class ChickenPizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;

  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }

  prepare(): void {
    console.log("Preparing", this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
    this.pepperoni = this.ingredientFactory.createPepperoni();
    this.chicken = this.ingredientFactory.createChicken();
  }
}

class DefaultPizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;

  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }

  prepare(): void {
    console.log("Preparing", this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
  }
}

abstract class PizzaStore {
  orderPizza(type: PizzaType): Pizza {
    let pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  abstract createPizza(type: PizzaType): Pizza;
}

class IndianPizzaStore extends PizzaStore {
  createPizza(type: PizzaType): Pizza {
    let pizza: Pizza;
    //abstract factory
    let pizzaIngredientFactory = new IndianPizzaIngredientFactory();

    if (type == PizzaType.Cheese) {
      pizza = new CheesePizza(pizzaIngredientFactory);
      pizza.setName("Indian Cheese Pizza");
    } else if (type == PizzaType.Chicken) {
      pizza = new ChickenPizza(pizzaIngredientFactory);
      pizza.setName("Indian Chicken Pizza");
    } else {
      pizza = new DefaultPizza(pizzaIngredientFactory);
      pizza.setName("Indian Pizza");
    }

    return pizza;
  }
}

const indianPizzaStore = new IndianPizzaStore();
const indianCheesePizza = indianPizzaStore.orderPizza(PizzaType.Cheese);
console.log(`Vikas ordered a ${indianCheesePizza.getName()} pizza!`);

const indianChickenPizza = indianPizzaStore.orderPizza(PizzaType.Chicken);
console.log(`Honey ordered a ${indianChickenPizza.getName()} pizza!`);
