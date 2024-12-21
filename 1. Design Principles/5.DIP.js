// Bad example - violating DIP
class MySQLDatabase {
  save(data) {
    console.log("Saving data to MySQL:", data);
  }
}

class UserService {
  constructor() {
    this.database = new MySQLDatabase(); // Direct dependency on concrete class
  }

  saveUser(user) {
    this.database.save(user);
  }
}

// Good example - following DIP
class Database {
  save(data) {
    throw new Error("Save method must be implemented");
  }
}

class MySQLDatabase extends Database {
  save(data) {
    console.log("Saving data to MySQL:", data);
  }
}

class MongoDatabase extends Database {
  save(data) {
    console.log("Saving data to MongoDB:", data);
  }
}

class UserService {
  constructor(database) {
    this.database = database; // Dependency injection through constructor
  }

  saveUser(user) {
    this.database.save(user);
  }
}

// Usage
const mysqlDb = new MySQLDatabase();
const mongoDb = new MongoDatabase();

const userService1 = new UserService(mysqlDb);
const userService2 = new UserService(mongoDb);

userService1.saveUser({ id: 1, name: "John" });
userService2.saveUser({ id: 2, name: "Jane" });
