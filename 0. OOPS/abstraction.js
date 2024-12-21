//abstraction - hide the details and show the essentials

//getters and setters
class Vehicle2 {
  constructor(color) {
    //calls setter
    this.color = color;
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
  }
}

const vehicle2 = new Vehicle2("red");
//calls getter
console.log(vehicle2.color);

//core concepts of Abstraction
//1. getters and setters
//2. private properties
//3. static methods
//4. method overloading
//5. symbols
//6. private fields
//7. private methods
//8. public fields
//9. public methods
//10. private getters and setters
//11. public getters and setters
//12. static properties
//13. static getters and setters
//14. static private properties
//15. static private getters and setters
//16. static public properties
//17. static public getters and setters
//18. static private methods
//19. static public methods
//20. static private getters and setters
//21. static public getters and setters
//22. static private fields
//23. static public fields