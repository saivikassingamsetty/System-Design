enum PizzaType {
    Cheese = 'cheese',
    Chicken = 'chicken',
    Default = 'default'
}

abstract class Pizza {
    name: string;
    dough: string;
    sauce: string;
    toppings: string[] = [];
    veggies: string[];
    cheese: string;
    pepperoni: string;
    clams: string;

    prepare() {
        console.log("Preparing ...", this.name);
        console.log("Tossing dough ...", this.dough);
        console.log("Adding sauce ...", this.sauce);
        console.log("Adding toppings ...", this.toppings)
    }

    bake() {
        console.log("Baking at 100 heat ...")
    }
    
    cut() {
        console.log("Cutting the pizza")
    }

    box() {
        console.log("Placing in the box")
    }

    setName(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class IndianCheesePizza extends Pizza {
    constructor() {
        super();
        this.name = 'Indian Cheese Pizza';
        this.dough = 'Thin Crust';
        this.sauce = 'Hot Chilli Sauce';
        this.toppings = ['Onion', 'Pepper', 'Mushroom']
    }

    box(): void {
        console.log('Placing in Veg box');
    }
}

class IndianChickenPizza extends Pizza {
    constructor() {
        super();
        this.name = 'Indian Chicken Pizza';
        this.dough = 'Not Thin Crust';
        this.sauce = 'Pepper Sauce';
        this.toppings = ['Onion', 'Pepper', 'Black Pepper']
    }

    box(): void {
        console.log('Placing in Non-Veg box');
    }
}

class IndianDefaultPizza extends Pizza {
    constructor() {
        super();
        this.name = 'Indian Base Pizza';
        this.dough = 'Normal dough';
        this.sauce = 'Tomoto Sauce';
        this.toppings = ['Onion', 'Pepper']
    }

    box(): void {
        console.log('Placing in normal box');
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

        if (type == 'cheese') {
            pizza = new IndianCheesePizza();
        } else if (type == "chicken") {
            pizza = new IndianChickenPizza();
        } else {
            pizza = new IndianDefaultPizza();
        }

        return pizza;
    }
}


const indianPizzaStore = new IndianPizzaStore();
const indianCheesePizza = indianPizzaStore.orderPizza(PizzaType.Cheese);
console.log(`Vikas ordered a ${indianCheesePizza.getName()} pizza!`);

const indianChickenPizza = indianPizzaStore.orderPizza(PizzaType.Chicken);
console.log(`Honey ordered a ${indianChickenPizza.getName()} pizza!`);