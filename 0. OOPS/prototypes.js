//prototype for the object
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

console.log(circleZ.__proto__); //Empty Object
console.log(Circle.prototype); //Empty Object
console.log(Circle.__proto__); //Function
console.log(Circle.__proto__.__proto__); //Object
console.log(Circle.__proto__.__proto__.__proto__); //null

console.log(typeof Circle); //function

//setting a prototype
const employee = {
  getTax: function () {
    console.log("Tax");
  },
};

const employee1 = {
  salary: 10000,
};

employee1.__proto__ = employee;
console.log(employee1.salary);
employee1.getTax();

//overriding a prototype method
const employee2 = {
  getTax: function () {
    console.log("Tax 2");
  },
};

employee2.__proto__ = employee;
employee2.getTax(); //Tax 2
