"use strict";
// Prototype
class Prototype {
    constructor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    ;
}
//Concrete Prototype
class Circle extends Prototype {
    constructor(position, radius, color) {
        super(color);
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
    clone() {
        const clone = Object.create(this);
        clone.position = Object.create(this.position);
        clone.radius = this.radius;
        clone.color = this.color;
        return clone;
    }
}
class Rectangle extends Prototype {
    constructor(position, length, breadth, color) {
        super(color);
        this.position = position;
        this.length = length;
        this.breadth = breadth;
        this.color = color;
    }
    clone() {
        const clone = Object.create(this);
        clone.position = Object.create(this.position);
        clone.length = this.length;
        clone.breadth = this.breadth;
        clone.color = this.color;
        return clone;
    }
}
//Prototype Registry
class PrototypeRegistry {
    constructor() {
        this.prototypes = new Map();
    }
    addPrototype(name, prototype) {
        this.prototypes.set(name, prototype);
    }
    getPrototype(name) {
        return this.prototypes.get(name);
    }
    getPrototypeByColor(color) {
        for (let [name, prototype] of this.prototypes) {
            if (prototype.getColor() == color) {
                return prototype;
            }
        }
    }
}
// Client Code
const myCircle = new Circle([0, 0], 5, 'red');
myCircle.color = 'blue';
const registry = new PrototypeRegistry();
registry.addPrototype('blueCircle', myCircle);
console.log(myCircle.getColor());
const blueCircle = registry.getPrototypeByColor('blue');
console.log(blueCircle);
