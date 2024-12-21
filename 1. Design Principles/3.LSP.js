// Base class representing a Bird
class Bird {
  fly() {
    return "I can fly";
  }

  makeSound() {
    return "Tweet tweet";
  }
}

// Sparrow is-a Bird, follows LSP
class Sparrow extends Bird {
  fly() {
    return "Sparrow flies at medium altitude";
  }

  makeSound() {
    return "Chirp chirp";
  }
}

// Eagle is-a Bird, follows LSP
class Eagle extends Bird {
  fly() {
    return "Eagle soars at high altitude";
  }

  makeSound() {
    return "Screech!";
  }
}

// This would violate LSP because not all birds can fly
// To fix this, we should separate flying capability into a different interface
class Penguin extends Bird {
  fly() {
    // This violates LSP because it changes the expected behavior
    throw new Error("Cannot fly!");
  }

  makeSound() {
    return "Honk honk";
  }
}

// Better design following LSP
class Animal {
  makeSound() {
    return "Some sound";
  }
}

class FlyingCreature {
  fly() {
    return "I can fly";
  }
}

// Now we can compose capabilities without violating LSP
class ImprovedSparrow extends Animal {
  constructor() {
    super();
    this.flyingAbility = new FlyingCreature();
  }

  makeSound() {
    return "Chirp chirp";
  }

  fly() {
    return this.flyingAbility.fly();
  }
}

class ImprovedPenguin extends Animal {
  makeSound() {
    return "Honk honk";
  }

  swim() {
    return "I can swim";
  }
}

// Testing
function makeBirdFly(bird) {
  return bird.fly();
}

// These will work as expected
const sparrow = new Sparrow();
const eagle = new Eagle();
console.log(makeBirdFly(sparrow)); // "Sparrow flies at medium altitude"
console.log(makeBirdFly(eagle)); // "Eagle soars at high altitude"

// This will throw an error, showing the LSP violation
// const penguin = new Penguin();
// console.log(makeBirdFly(penguin)); // Error: Cannot fly!

// Better design doesn't force non-flying birds to implement fly
const improvedPenguin = new ImprovedPenguin();
const improvedSparrow = new ImprovedSparrow();

console.log(improvedPenguin.makeSound()); // "Honk honk"
console.log(improvedPenguin.swim()); // "I can swim"
console.log(improvedSparrow.fly()); // "I can fly"
