// Example of Open/Closed Principle in JavaScript

// Base class for Shape
class Shape {
  constructor(name) {
    this.name = name;
  }

  area() {
    throw new Error("Area method must be implemented");
  }
}

// Derived class for Rectangle
class Rectangle extends Shape {
  constructor(width, height) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

// Derived class for Circle
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

// Function to calculate the total area of an array of shapes
function totalArea(shapes) {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}

// Example usage
const shapes = [new Rectangle(10, 20), new Circle(5)];

console.log(`Total Area: ${totalArea(shapes)}`);
