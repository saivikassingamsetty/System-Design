"use strict";
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(x, y) {
        this.x += x;
        this.y += y;
    }
    draw() {
        console.log(`A Dot has been drawn at (${this.x}, ${this.y})`);
    }
}
class CircleLeaf extends Dot {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    draw() {
        console.log(`A Circle with radius ${this.radius} has been drawn at (${this.x}, ${this.y})`);
    }
}
class CompoundGraphic {
    constructor(children = []) {
        this.children = children;
    }
    addChild(child) {
        this.children.push(child);
    }
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
    move(x, y) {
        this.children.forEach((child) => child.move(x, y));
    }
    draw() {
        this.children.forEach((child) => child.draw());
    }
}
// Client code demonstrating usage:
let dot = new Dot(1, 2);
let circle = new CircleLeaf(5, 5, 5);
let compound = new CompoundGraphic();
compound.addChild(dot);
compound.addChild(circle);
compound.move(10, 10);
compound.draw();
let largeCompound = new CompoundGraphic();
largeCompound.addChild(dot);
largeCompound.addChild(circle);
largeCompound.addChild(compound);
largeCompound.move(50, 50);
largeCompound.draw();
