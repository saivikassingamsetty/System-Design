//static methods - methods that are called on the class itself, not on the object
class Circle2 {
  constructor(radius) {
    this.radius = radius;
  }

  //static method
  static parse(str) {
    const radius = JSON.parse(str).radius;
    return new Circle2(radius);
  }
}

const circle2 = Circle2.parse('{"radius": 1}');
console.log(circle2.radius);
