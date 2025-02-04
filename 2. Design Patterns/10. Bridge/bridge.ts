interface ColorPicker {
  color: string;
}

class Red implements ColorPicker {
  color: string;

  constructor() {
    this.color = "red";
  }
}

class Blue implements ColorPicker {
  color: string;

  constructor() {
    this.color = "blue";
  }
}

abstract class Shape {
  color: ColorPicker;

  constructor(colorPicker: ColorPicker) {
    this.color = colorPicker;
  }

  abstract getArea(): any;
}

class MyCircle extends Shape {
  radius: number;

  constructor(colorPicker: ColorPicker, radius: number) {
    super(colorPicker);
    this.radius = radius;
  }

  getArea() {
    console.log("Area is", Math.PI * this.radius * this.radius);
  }
}

class MySquare extends Shape {
  size: number;

  constructor(colorPicker: ColorPicker, size: number) {
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
