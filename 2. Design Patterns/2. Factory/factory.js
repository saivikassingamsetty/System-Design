//problem, its not closed for modification if more types came or old types removed, we need to change this code
function orderPizza(type) {
  let pizza;

  if (type == "veg") {
    pizza = new VegPizza();
  } else if (type == "egg") {
    pizza = new EggPizza();
  } else {
    pizza = new NormalPizza();
  }

  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();

  return pizza;
}

orderPizza();

//solution, create a new class for what varies so we will have seperation of concerns
class PizzaFactory {
  static createPizza(type) {
    if (type == "veg") {
      pizza = new VegPizza();
    } else if (type == "egg") {
      pizza = new EggPizza();
    } else {
      pizza = new NormalPizza();
    }

    return pizza;
  }
}

function orderPizza(type) {
  const pizza = PizzaFactory.createPizza(type);

  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();

  return pizza;
}

orderPizza();

//ok, let get some more back
class PizzaStore {
  pizzaFactory;

  constructor(factory) {
    this.pizzaFactory = factory;
  }

  orderPizza(type) {
    const pizza = this.pizzaFactory.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

//indian pizza, implements an interface SimplePizzaFactory
indianPizzaFactory = new IndianPizzaFactory();
indianPizzaStore = new PizzaStore(indianPizzaFactory);
indianPizzaStore.orderPizza();

//american pizza, implements an interface SimplePizzaFactory
americanPizzaFactory = new AmericanPizzaFactory();
americanPizzaStore = new PizzaStore(americanPizzaFactory);
americanPizzaStore.orderPizza();

//this is good, what if we want regional or subclasses to decide the creation
//to make this possible, we can add an abstract method in PizzaStore
//now our PizzaStore is an abstract class
class PizzaStore {
  constructor() {}

  orderPizza(type) {
    const pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  //abstract method
  //this is our factory method
  //all sub classes must implement this
  createPizza(type) {}
}

//now when a IndianPizzaStore wants to add thier own preference of pizza creation, they can!
class IndianPizzaStore extends PizzaStore {
  createPizza(type) {
    if (type == "veg") {
      pizza = new IndianVegPizza();
    } else if (type == "egg") {
      pizza = new IndianEggPizza();
    } else {
      pizza = new IndianNormalPizza();
    }

    return pizza;
  }
}

//orderPizza is a superclass method which don't know which pizza its making, it just prepare, box
//Pizza
class Pizza {
  name;
  dough;
  sauce;
  toppings = [];

  prepare() {
    console.log("Preparing ...", this.name);
    console.log("Tossing dough ...", this.dough);
    console.log("Adding sauce ...", this.sauce);
    console.log("Adding toppings ...", this.toppings);
  }
  bake() {
    console.log("Baking at 100 heat ...");
  }
  cut() {
    console.log("Cutting the pizza");
  }
  box() {
    console.log("Placing in the box");
  }
}

class IndianVegPizza extends Pizza {
  constructor() {
    this.name = "Indian Veg Pizza";
    this.dough = "Good dough";
    this.sauce = "Soya Sauce";
    this.toppings.push("Cheese");
  }

  cut() {
    console.log("Cutting pizza into 8");
  }
}
