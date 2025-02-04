"use strict";
class Red {
    constructor() {
        this.color = "red";
    }
}
class Blue {
    constructor() {
        this.color = "blue";
    }
}
class Shape {
    constructor(colorPicker) {
        this.color = colorPicker;
    }
}
class MyCircle extends Shape {
    constructor(colorPicker, radius) {
        super(colorPicker);
        this.radius = radius;
    }
    getArea() {
        console.log("Area is", Math.PI * this.radius * this.radius);
    }
}
class MySquare extends Shape {
    constructor(colorPicker, size) {
        super(colorPicker);
        this.size = size;
    }
    getArea() {
        console.log("Area is", this.size * this.size);
    }
}
const redColor = new Red();
const blueColor = new Blue();
const cir1 = new MyCircle(redColor, 5);
cir1.getArea();
const cir2 = new MyCircle(blueColor, 10);
cir2.getArea();
const sq1 = new MySquare(redColor, 5);
sq1.getArea();
