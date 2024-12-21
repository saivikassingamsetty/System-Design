// Bad Example - Violating ISP with one large interface
class PrinterInterface {
  print() {}
  scan() {}
  fax() {}
  staple() {}
}

class SimplePrinter extends PrinterInterface {
  print(doc) {
    console.log("Printing document...");
  }

  // Problem: Simple printer forced to implement unnecessary methods
  scan() {
    throw new Error("Scan not supported");
  }
  fax() {
    throw new Error("Fax not supported");
  }
  staple() {
    throw new Error("Staple not supported");
  }
}

// Good Example - Following ISP with segregated interfaces
class Printer {
  print(doc) {
    console.log("Printing document...");
  }
}

class Scanner {
  scan() {
    console.log("Scanning document...");
  }
}

class FaxMachine {
  fax(doc) {
    console.log("Faxing document...");
  }
}

// Now devices can implement only what they need
class ModernPrinter extends Printer {
  print(doc) {
    console.log("Printing in high resolution...");
  }
}

class AllInOnePrinter extends Printer {
  constructor() {
    super();
    this.scanner = new Scanner();
    this.faxMachine = new FaxMachine();
  }

  scan() {
    this.scanner.scan();
  }

  fax(doc) {
    this.faxMachine.fax(doc);
  }
}

// Usage
const simplePrinter = new ModernPrinter();
const allInOnePrinter = new AllInOnePrinter();

simplePrinter.print("document"); // Works fine
allInOnePrinter.print("document"); // Works fine
allInOnePrinter.scan(); // Works fine
allInOnePrinter.fax("document"); // Works fine
