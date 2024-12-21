//core concept of OOPS
//encapsulation - bundling of data with the methods that operate on that data
//abstraction - hide the details and show the essentials
//inheritance - mechanism that allows you to eliminate redundant code
//polymorphism - ability to call the same method on different objects and each object responding in different ways

// cretaing object using object literal syntax
const circle = {
  radius: 2,
  location: {
    x: 10,
    y: 10,
  },
  draw: function () {
    console.log("draw");
  },
};

circle.draw();

//factory function
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log("draw");
    },
  };
}

const circleF = createCircle(10);
const circleA = createCircle(20);
circleF.draw();
circleA.draw();

//constructor function -- old dated
function CircleF(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw");
  };
}

const circleC = new CircleF(30);
circleC.draw();

//class syntax -- ES6
class Circle {
  constructor(radius) {
    this.radius = radius;
    this.draw = function () {
      console.log("draw");
    };
  }
}

const circleZ = new Circle(40);
console.log(circleZ.radius);
circleZ.draw();

//these will return the same
console.log(Circle);
console.log(circleZ.constructor);

//this will return a constructor function
console.log(Circle.constructor);

//using functions's call instead of new
const circleX = CircleF.call({}, 50);

//adding and removing properties
circleZ.location = { x: 1 };
console.log(circleZ.location);
delete circleZ.location;
console.log(circleZ.location);

//enumerating properties
for (let key in circleZ) {
  if (typeof circleZ[key] !== "function") {
    console.log(key, circleZ[key]);
  }
}

//getting all the keys
const keys = Object.keys(circleZ);

//checking if a property exists
if ("radius" in circleZ) {
  console.log("Circle has a radius");
}

//private and public properties in class Vehicle
//hide schema from outside world in vehicle class
class Vehicle {
  constructor(color) {
    //local variable
    let schema = {
      type: "car",
      model: "2020",
    };

    this.color = color;
    this.getSchema = function () {
      //we dont need this keyword here because we are in the same scope
      //closure
      return schema;
    };
  }
}

const vehicle = new Vehicle("red");
console.log(vehicle.color);
vehicle.color = "blue";
console.log(vehicle.color);
console.log(vehicle.getSchema());
console.log(vehicle.schema); //undefined
