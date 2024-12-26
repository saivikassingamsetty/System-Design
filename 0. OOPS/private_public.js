//private properties are not accessible outside the class
class Vehicle {
  #schema = 100;

  constructor(name) {
    this.name = name;
    console.log(this.#schema);
  }

  getName() {
    console.log(this.#schema);
    return this.name;
  }
}

const tata = new Vehicle("tata");
console.log(tata.getName());
// console.log(tata.#schema); //private field '#schema' must be declared in an enclosing class

//public properties are accessible outside the class
class Vehicle2 {
  schema = 100;

  constructor(name) {
    this.name = name;
    console.log(this.schema);
  }

  getName() {
    console.log(this.schema);
    return this.name;
  }
}

const tata2 = new Vehicle2("tata");
console.log(tata2.getName());
console.log(tata2.schema);

//using symbols to implement private properties
const _color = Symbol();
class Vehicle3 {
  constructor(color) {
    this[_color] = color;
  }
}

const vehicle3 = new Vehicle3("red");
console.log(vehicle3.color); //undefined

//private methods
class Vehicle4 {
  #getColor() {
    return "red";
  }

  constructor() {
    console.log(this.#getColor());
  }
}

const veh4 = new Vehicle4();

//private getters and setters
class Vehicle5 {
  get #color() {
    return 100;
  }

  set #color(value) {
    this.#color = value;
  }

  constructor() {
    console.log(this.#color);
  }

  updateColor() {
    this.#color = 200;
  }
}

const veh5 = new Vehicle5();
//max call stack error
// veh5.updateColor();

//update the private property using public method
class Vehicle6 {
  #color = 100;

  constructor() {
    console.log(this.#color);
  }

  updateColor() {
    this.#color = 200;
  }
}
