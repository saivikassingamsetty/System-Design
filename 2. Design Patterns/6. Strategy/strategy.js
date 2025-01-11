var ConcreteStrategyAdd = /** @class */ (function () {
    function ConcreteStrategyAdd() {
    }
    ConcreteStrategyAdd.prototype.execute = function (a, b) {
        return a + b;
    };
    return ConcreteStrategyAdd;
}());
var ConcreteStrategySubtract = /** @class */ (function () {
    function ConcreteStrategySubtract() {
    }
    ConcreteStrategySubtract.prototype.execute = function (a, b) {
        return a - b;
    };
    return ConcreteStrategySubtract;
}());
var ConcreteStrategyMultiply = /** @class */ (function () {
    function ConcreteStrategyMultiply() {
    }
    ConcreteStrategyMultiply.prototype.execute = function (a, b) {
        return a * b;
    };
    return ConcreteStrategyMultiply;
}());
var Context = /** @class */ (function () {
    function Context(strategy) {
        this.strategy = strategy;
    }
    Context.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    Context.prototype.execute = function (a, b) {
        return this.strategy.execute(a, b);
    };
    return Context;
}());
//Client Code
var context = new Context(new ConcreteStrategyAdd());
console.log(context.execute(1, 2));
// User Selects which strategy to use
context.setStrategy(new ConcreteStrategySubtract());
var res = context.execute(1, 2);
console.log(res);
