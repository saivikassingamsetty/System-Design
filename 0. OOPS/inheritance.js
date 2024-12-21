class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log("Hello Dude");
  }
  Breathe() {
    console.log(this.name, "is breathing");
  }
}

class Engineer extends Person {
  constructor(name, age, salary) {
    //super keyword is used to call the constructor of the parent class
    super(name, age);
    this.salary = salary;
  }

  //method overriding
  sayHello() {
    console.log("Hello Engineer");
  }
}

const person = new Person("John", 30);
person.sayHello(); // Hello Dude
const engineer = new Engineer("Jane", 25, 50000);
engineer.sayHello(); // Hello Engineer
engineer.Breathe(); // Jane is breathing
