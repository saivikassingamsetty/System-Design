"use strict";
class RoundPeg {
    constructor(radius) {
        this.radius = radius;
    }
    getRadius() {
        return this.radius;
    }
}
class RoundHole {
    constructor(radius) {
        this.radius = radius;
    }
    getRadius() {
        return this.radius;
    }
    fit(peg) {
        console.log(this.radius >= peg.getRadius() ? "Fits" : "Unfit");
    }
}
class SquarePeg {
    constructor(width) {
        this.width = width;
    }
    getWidth() {
        return this.width;
    }
}
class SquarePegAdapter extends RoundPeg {
    constructor(peg) {
        super(0);
        this.peg = peg;
    }
    getRadius() {
        return (this.peg.getWidth() * Math.sqrt(2)) / 2;
    }
}
const hole = new RoundHole(5);
const rpeg = new RoundPeg(5);
hole.fit(rpeg); //true
const speg_small = new SquarePeg(5);
const speg_large = new SquarePeg(10);
// hole.fit(speg_small) //wont compatible
const speg_small_adapter = new SquarePegAdapter(speg_small);
const speg_large_adapter = new SquarePegAdapter(speg_large);
hole.fit(speg_small_adapter); //true
hole.fit(speg_large_adapter); //false
