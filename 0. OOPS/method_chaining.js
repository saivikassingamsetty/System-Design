class Vehicle7 {
  constructor(color) {
    this.color = color;
  }

  drive() {
    console.log("Driving");
    return this;
  }

  stop() {
    console.log("Stopped");
    return this;
  }
}

const vehicle7 = new Vehicle7("red");
vehicle7.drive().stop();
