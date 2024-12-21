// Bad example - Class handling multiple responsibilities
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  calculateTax() {
    return this.salary * 0.2;
  }

  saveToDB() {
    // Save employee to database
    console.log(`Saving ${this.name} to database`);
  }

  generateReport() {
    // Generate employee report
    console.log(`Generating report for ${this.name}`);
  }
}

// Good example - Classes with single responsibilities
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  getName() {
    return this.name;
  }

  getSalary() {
    return this.salary;
  }
}

class TaxCalculator {
  calculateTax(employee) {
    return employee.getSalary() * 0.2;
  }
}

class EmployeeRepository {
  save(employee) {
    console.log(`Saving ${employee.getName()} to database`);
  }
}

class ReportGenerator {
  generateReport(employee) {
    console.log(`Generating report for ${employee.getName()}`);
  }
}

// Usage
const employee = new Employee("John Doe", 50000);
const taxCalculator = new TaxCalculator();
const repository = new EmployeeRepository();
const reporter = new ReportGenerator();

const tax = taxCalculator.calculateTax(employee);
repository.save(employee);
reporter.generateReport(employee);
