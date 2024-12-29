"use strict";
var PizzaType;
(function (PizzaType) {
    PizzaType["Cheese"] = "cheese";
    PizzaType["Chicken"] = "chicken";
    PizzaType["Default"] = "default";
})(PizzaType || (PizzaType = {}));
//sub ingredients
class ThinCrustDough {
}
class MarinaraSauce {
}
class ReggianoCheese {
}
class Garlic {
}
class Onion {
}
class Mushroom {
}
class RedPepper {
}
class SlicedPepperoni {
}
class FreshClams {
}
class BroilerChicken {
}
class IndianPizzaIngredientFactory {
    createDough() {
        return new ThinCrustDough();
    }
    createSauce() {
        return new MarinaraSauce();
    }
    createCheese() {
        return new ReggianoCheese();
    }
    createVeggies() {
        const veggies = [
            new Garlic(),
            new Onion(),
            new RedPepper(),
            new Mushroom(),
        ];
        return veggies;
    }
    createPepperoni() {
        return new SlicedPepperoni();
    }
    createClam() {
        return new FreshClams();
    }
    createChicken() {
        return new BroilerChicken();
    }
}
class Pizza {
    constructor() {
        this.toppings = [];
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
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class CheesePizza extends Pizza {
    constructor(ingredientFactory) {
        super();
        this.ingredientFactory = ingredientFactory;
    }
    prepare() {
        console.log("Preparing", this.getName());
        this.dough = this.ingredientFactory.createDough();
        this.sauce = this.ingredientFactory.createSauce();
        this.cheese = this.ingredientFactory.createCheese();
        this.veggies = this.ingredientFactory.createVeggies();
    }
}
class ChickenPizza extends Pizza {
    constructor(ingredientFactory) {
        super();
        this.ingredientFactory = ingredientFactory;
    }
    prepare() {
        console.log("Preparing", this.getName());
        this.dough = this.ingredientFactory.createDough();
        this.sauce = this.ingredientFactory.createSauce();
        this.cheese = this.ingredientFactory.createCheese();
        this.pepperoni = this.ingredientFactory.createPepperoni();
        this.chicken = this.ingredientFactory.createChicken();
    }
}
class DefaultPizza extends Pizza {
    constructor(ingredientFactory) {
        super();
        this.ingredientFactory = ingredientFactory;
    }
    prepare() {
        console.log("Preparing", this.getName());
        this.dough = this.ingredientFactory.createDough();
        this.sauce = this.ingredientFactory.createSauce();
        this.cheese = this.ingredientFactory.createCheese();
    }
}
class PizzaStore {
    orderPizza(type) {
        let pizza = this.createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        return pizza;
    }
}
class IndianPizzaStore extends PizzaStore {
    createPizza(type) {
        let pizza;
        //abstract factory
        let pizzaIngredientFactory = new IndianPizzaIngredientFactory();
        if (type == PizzaType.Cheese) {
            pizza = new CheesePizza(pizzaIngredientFactory);
            pizza.setName("Indian Cheese Pizza");
        }
        else if (type == PizzaType.Chicken) {
            pizza = new ChickenPizza(pizzaIngredientFactory);
            pizza.setName("Indian Chicken Pizza");
        }
        else {
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
