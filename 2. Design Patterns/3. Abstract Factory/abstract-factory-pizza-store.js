var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null",
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var PizzaType;
(function (PizzaType) {
  PizzaType["Cheese"] = "cheese";
  PizzaType["Chicken"] = "chicken";
  PizzaType["Default"] = "default";
})(PizzaType || (PizzaType = {}));
//sub ingredients
var ThinCrustDough = /** @class */ (function () {
  function ThinCrustDough() {}
  return ThinCrustDough;
})();
var MarinaraSauce = /** @class */ (function () {
  function MarinaraSauce() {}
  return MarinaraSauce;
})();
var ReggianoCheese = /** @class */ (function () {
  function ReggianoCheese() {}
  return ReggianoCheese;
})();
var Garlic = /** @class */ (function () {
  function Garlic() {}
  return Garlic;
})();
var Onion = /** @class */ (function () {
  function Onion() {}
  return Onion;
})();
var Mushroom = /** @class */ (function () {
  function Mushroom() {}
  return Mushroom;
})();
var RedPepper = /** @class */ (function () {
  function RedPepper() {}
  return RedPepper;
})();
var SlicedPepperoni = /** @class */ (function () {
  function SlicedPepperoni() {}
  return SlicedPepperoni;
})();
var FreshClams = /** @class */ (function () {
  function FreshClams() {}
  return FreshClams;
})();
var BroilerChicken = /** @class */ (function () {
  function BroilerChicken() {}
  return BroilerChicken;
})();
var IndianPizzaIngredientFactory = /** @class */ (function () {
  function IndianPizzaIngredientFactory() {}
  IndianPizzaIngredientFactory.prototype.createDough = function () {
    return new ThinCrustDough();
  };
  IndianPizzaIngredientFactory.prototype.createSauce = function () {
    return new MarinaraSauce();
  };
  IndianPizzaIngredientFactory.prototype.createCheese = function () {
    return new ReggianoCheese();
  };
  IndianPizzaIngredientFactory.prototype.createVeggies = function () {
    var veggies = [new Garlic(), new Onion(), new RedPepper(), new Mushroom()];
    return veggies;
  };
  IndianPizzaIngredientFactory.prototype.createPepperoni = function () {
    return new SlicedPepperoni();
  };
  IndianPizzaIngredientFactory.prototype.createClam = function () {
    return new FreshClams();
  };
  IndianPizzaIngredientFactory.prototype.createChicken = function () {
    return new BroilerChicken();
  };
  return IndianPizzaIngredientFactory;
})();
var Pizza = /** @class */ (function () {
  function Pizza() {
    this.toppings = [];
  }
  Pizza.prototype.bake = function () {
    console.log("Baking at 100 heat ...");
  };
  Pizza.prototype.cut = function () {
    console.log("Cutting the pizza");
  };
  Pizza.prototype.box = function () {
    console.log("Placing in the box");
  };
  Pizza.prototype.setName = function (name) {
    this.name = name;
  };
  Pizza.prototype.getName = function () {
    return this.name;
  };
  return Pizza;
})();
var CheesePizza = /** @class */ (function (_super) {
  __extends(CheesePizza, _super);
  function CheesePizza(ingredientFactory) {
    var _this = _super.call(this) || this;
    _this.ingredientFactory = ingredientFactory;
    return _this;
  }
  CheesePizza.prototype.prepare = function () {
    console.log("Preparing", this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
    this.veggies = this.ingredientFactory.createVeggies();
  };
  return CheesePizza;
})(Pizza);
var ChickenPizza = /** @class */ (function (_super) {
  __extends(ChickenPizza, _super);
  function ChickenPizza(ingredientFactory) {
    var _this = _super.call(this) || this;
    _this.ingredientFactory = ingredientFactory;
    return _this;
  }
  ChickenPizza.prototype.prepare = function () {
    console.log("Preparing", this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
    this.pepperoni = this.ingredientFactory.createPepperoni();
    this.chicken = this.ingredientFactory.createChicken();
  };
  return ChickenPizza;
})(Pizza);
var DefaultPizza = /** @class */ (function (_super) {
  __extends(DefaultPizza, _super);
  function DefaultPizza(ingredientFactory) {
    var _this = _super.call(this) || this;
    _this.ingredientFactory = ingredientFactory;
    return _this;
  }
  DefaultPizza.prototype.prepare = function () {
    console.log("Preparing", this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
  };
  return DefaultPizza;
})(Pizza);
var PizzaStore = /** @class */ (function () {
  function PizzaStore() {}
  PizzaStore.prototype.orderPizza = function (type) {
    var pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  };
  return PizzaStore;
})();
var IndianPizzaStore = /** @class */ (function (_super) {
  __extends(IndianPizzaStore, _super);
  function IndianPizzaStore() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  IndianPizzaStore.prototype.createPizza = function (type) {
    var pizza;
    //abstract factory
    var pizzaIngredientFactory = new IndianPizzaIngredientFactory();
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
  };
  return IndianPizzaStore;
})(PizzaStore);
var indianPizzaStore = new IndianPizzaStore();
var indianCheesePizza = indianPizzaStore.orderPizza(PizzaType.Cheese);
console.log("Vikas ordered a ".concat(indianCheesePizza.getName(), " pizza!"));
var indianChickenPizza = indianPizzaStore.orderPizza(PizzaType.Chicken);
console.log("Honey ordered a ".concat(indianChickenPizza.getName(), " pizza!"));
