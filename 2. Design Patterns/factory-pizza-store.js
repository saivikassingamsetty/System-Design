var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PizzaType;
(function (PizzaType) {
    PizzaType["Cheese"] = "cheese";
    PizzaType["Chicken"] = "chicken";
    PizzaType["Default"] = "default";
})(PizzaType || (PizzaType = {}));
var Pizza = /** @class */ (function () {
    function Pizza() {
        this.toppings = [];
    }
    Pizza.prototype.prepare = function () {
        console.log("Preparing ...", this.name);
        console.log("Tossing dough ...", this.dough);
        console.log("Adding sauce ...", this.sauce);
        console.log("Adding toppings ...", this.toppings);
    };
    Pizza.prototype.bake = function () {
        console.log("Baking at 100 heat ...");
    };
    Pizza.prototype.cut = function () {
        console.log("Cutting the pizza");
    };
    Pizza.prototype.box = function () {
        console.log("Placing in the box");
    };
    Pizza.prototype.getName = function () {
        return this.name;
    };
    return Pizza;
}());
var IndianCheesePizza = /** @class */ (function (_super) {
    __extends(IndianCheesePizza, _super);
    function IndianCheesePizza() {
        var _this = _super.call(this) || this;
        _this.name = 'Indian Cheese Pizza';
        _this.dough = 'Thin Crust';
        _this.sauce = 'Hot Chilli Sauce';
        _this.toppings = ['Onion', 'Pepper', 'Mushroom'];
        return _this;
    }
    IndianCheesePizza.prototype.box = function () {
        console.log('Placing in Veg box');
    };
    return IndianCheesePizza;
}(Pizza));
var IndianChickenPizza = /** @class */ (function (_super) {
    __extends(IndianChickenPizza, _super);
    function IndianChickenPizza() {
        var _this = _super.call(this) || this;
        _this.name = 'Indian Chicken Pizza';
        _this.dough = 'Not Thin Crust';
        _this.sauce = 'Pepper Sauce';
        _this.toppings = ['Onion', 'Pepper', 'Black Pepper'];
        return _this;
    }
    IndianChickenPizza.prototype.box = function () {
        console.log('Placing in Non-Veg box');
    };
    return IndianChickenPizza;
}(Pizza));
var IndianDefaultPizza = /** @class */ (function (_super) {
    __extends(IndianDefaultPizza, _super);
    function IndianDefaultPizza() {
        var _this = _super.call(this) || this;
        _this.name = 'Indian Base Pizza';
        _this.dough = 'Normal dough';
        _this.sauce = 'Tomoto Sauce';
        _this.toppings = ['Onion', 'Pepper'];
        return _this;
    }
    IndianDefaultPizza.prototype.box = function () {
        console.log('Placing in normal box');
    };
    return IndianDefaultPizza;
}(Pizza));
var PizzaStore = /** @class */ (function () {
    function PizzaStore() {
    }
    PizzaStore.prototype.orderPizza = function (type) {
        var pizza = this.createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        return pizza;
    };
    return PizzaStore;
}());
var IndianPizzaStore = /** @class */ (function (_super) {
    __extends(IndianPizzaStore, _super);
    function IndianPizzaStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndianPizzaStore.prototype.createPizza = function (type) {
        var pizza;
        if (type == 'cheese') {
            pizza = new IndianCheesePizza();
        }
        else if (type == "chicken") {
            pizza = new IndianChickenPizza();
        }
        else {
            pizza = new IndianDefaultPizza();
        }
        return pizza;
    };
    return IndianPizzaStore;
}(PizzaStore));
var indianPizzaStore = new IndianPizzaStore();
var indianCheesePizza = indianPizzaStore.orderPizza(PizzaType.Cheese);
console.log("Vikas ordered a ".concat(indianCheesePizza.getName(), " pizza!"));
var indianChickenPizza = indianPizzaStore.orderPizza(PizzaType.Chicken);
console.log("Honey ordered a ".concat(indianChickenPizza.getName(), " pizza!"));
