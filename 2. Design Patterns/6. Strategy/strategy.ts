interface Strategy {
  execute(a: number, b: number): number;
}

class ConcreteStrategyAdd implements Strategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

class ConcreteStrategySubtract implements Strategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

class ConcreteStrategyMultiply implements Strategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public execute(a: number, b: number) {
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
