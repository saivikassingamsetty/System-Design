"use strict";
class FlyWithWings {
    fly() {
        console.log("Flying.. Flying...");
    }
}
class FlyNoWay {
    fly() {
        console.log("I Can't fly");
    }
}
class Quack {
    quack() {
        console.log("Quack.. Quack..");
    }
}
class MuteQuack {
    quack() {
        console.log("... Silence ...");
    }
}
class Squeek {
    quack() {
        console.log("Squeek");
    }
}
class Duck {
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
    setFlyBehaviour(flyBehaviour) {
        this.flyBehaviour = flyBehaviour;
    }
    setquackBehaviour(quackBehaviour) {
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
