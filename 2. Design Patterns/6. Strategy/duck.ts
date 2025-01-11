interface FlyBehaviour {
  fly(): void;
}

class FlyWithWings implements FlyBehaviour {
  fly() {
    console.log("Flying.. Flying...");
  }
}

class FlyNoWay implements FlyBehaviour {
  fly() {
    console.log("I Can't fly");
  }
}

interface QuackBehaviour {
  quack(): void;
}

class Quack implements QuackBehaviour {
  quack(): void {
    console.log("Quack.. Quack..");
  }
}

class MuteQuack implements QuackBehaviour {
  quack(): void {
    console.log("... Silence ...");
  }
}

class Squeek implements QuackBehaviour {
  quack(): void {
    console.log("Squeek");
  }
}

class Duck {
  flyBehaviour: FlyBehaviour;
  quackBehaviour: QuackBehaviour;

  constructor() {
    this.flyBehaviour = new FlyWithWings();
    this.quackBehaviour = new Quack();
  }

  display() {
    console.log("Hi, I'm a duck!");
  }

  swim() {
    console.log("Swimming...");
  }

  quack() {
    this.quackBehaviour.quack();
  }

  fly() {
    this.flyBehaviour.fly();
  }

  setFlyBehaviour(flyBehaviour: FlyBehaviour) {
    this.flyBehaviour = flyBehaviour;
  }

  setquackBehaviour(quackBehaviour: QuackBehaviour) {
    this.quackBehaviour = quackBehaviour;
  }
}

class pondDuck extends Duck {
  display() {
    console.log("Hey, I'm a pond duck!");
  }
}

class rubberDuck extends Duck {
  constructor() {
    super();
    this.setquackBehaviour(new Squeek());
    this.setFlyBehaviour(new FlyNoWay());
  }

  display() {
    console.log("Hey, I'm a rubber duck!");
  }
}

class woodenDuck extends Duck {
  constructor() {
    super();
    this.setquackBehaviour(new MuteQuack());
    this.setFlyBehaviour(new FlyNoWay());
  }

  display() {
    console.log("Hey, I'm a wooden duck!");
  }
}

const duck = new pondDuck();
//giving ability to fly
duck.setFlyBehaviour(new FlyWithWings());
duck.fly();
duck.quack();
//taking off ability to fly and making it silent
duck.setFlyBehaviour(new FlyNoWay());
duck.fly();
duck.setquackBehaviour(new MuteQuack());
duck.quack();
