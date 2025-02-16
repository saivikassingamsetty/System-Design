class Subsystem1 {
  operation1() {
    console.log("Subsystem1 Ready");
  }

  operationN() {
    console.log("Subsystem1 Fire!");
  }
}

class Subsystem2 {
  anotherOperation1() {
    console.log("Subsystem2 Ready");
  }

  anotherOperationZ() {
    console.log("Subsystem2 Fire!");
  }
}

class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1: Subsystem1, subsystem2: Subsystem2) {
    this.subsystem1 = subsystem1;
    this.subsystem2 = subsystem2;
  }

  operate() {
    let result = "Facade initializes subsystems:\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.anotherOperation1();
    result += "Facade orders subsystems to perform the action:\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.anotherOperationZ();

    return result;
  }
}

//Client (assuming client already have the third part classes intiated)
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);

//
facade.operate();
