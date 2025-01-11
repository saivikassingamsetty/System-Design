"use strict";
class ConcreteStrategyAdd {
    execute(a, b) {
        return a + b;
    }
}
class ConcreteStrategySubtract {
    execute(a, b) {
        return a - b;
    }
}
class ConcreteStrategyMultiply {
    execute(a, b) {
        return a * b;
    }
}
class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    execute(a, b) {
        return this.strategy.execute(a, b);
    }
}
//Client Code
const context = new Context(new ConcreteStrategyAdd());
console.log(context.execute(1, 2));
// User Selects which strategy to use
context.setStrategy(new ConcreteStrategySubtract());
const res = context.execute(1, 2);
console.log(res);
