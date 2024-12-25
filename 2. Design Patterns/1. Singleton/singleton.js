/**
 * this file includes information about the singleton design pattern and how to implement it in JavaScript. The singleton pattern is a design pat instantiation of a ctern that restricts thelass to a single object.
 * This is useful when exactly one object is needed to coordinate actions across the system.
 *  The singleton pattern is implemented by creating a class with a method that creates a new instance of the class if one doesn't exist, and returns the existing instance if it does.
 * The singleton pattern is useful when a single object is needed to coordinate actions across the system, such as a logger, a configuration manager, or a connection pool.
 */

// Problem: We need to ensure that only one instance of a class is created and that instance is shared across the application.
// Solution: Singleton pattern
class Singleton {
    constructor() {
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      // Put your initialization code here
      Singleton.instance = this;
    }
  }
  
  // Usage
  const singleton1 = new Singleton();
  const singleton2 = new Singleton();
  console.log(singleton1 === singleton2); // true
  
  // Example 2: Singleton with a static method
  class Singleton {
    static instance;
  
    constructor() {
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      // Put your initialization code here
      Singleton.instance = this;
    }
  
    static getInstance() {
      return Singleton.instance || new Singleton();
    }
  }
  
  // Usage
  const singleton3 = Singleton.getInstance();
  const singleton4 = Singleton.getInstance();
  console.log(singleton3 === singleton4); // true
  
  // Example 3: Singleton with a static method and arguments
  class Singleton {
    static instance;
  
    constructor(data) {
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      this.data = data;
  
      Singleton.instance = this;
    }
  
    static getInstance(data) {
      return Singleton.instance || new Singleton(data);
    }
  }
  
  // Usage
  const singleton5 = Singleton.getInstance("test");
  const singleton6 = Singleton.getInstance("new test");
  console.log(singleton5 === singleton6); // true
  
  // Multithreading problem
  // The singleton pattern is not thread-safe. If multiple threads try to access the singleton instance at the same time, it may create multiple instances of the singleton class. To make the singleton pattern thread-safe, you can use a lock to ensure that only one thread can access the singleton instance at a time.
  class Singleton {
    static instance;
    static lock = false;
  
    constructor(data) {
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      this.data = data;
  
      Singleton.instance = this;
    }
  
    static getInstance(data) {
      if (!Singleton.lock) {
        Singleton.lock = true;
        return Singleton.instance || new Singleton(data);
      }
    }
  }
  
  // Do not use this implementation in production
  // This is just a simple example to show how you can make the singleton pattern thread-safe
  // In a real-world application, you should use a more robust locking mechanism
  
  // Robust locking mechanism
  // You can use a more robust locking mechanism to make the singleton pattern thread-safe. Here is an example using a mutex lock:
  class Singleton {
    static instance;
    static lock = new Mutex();
  
    constructor(data) {
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      this.data = data;
  
      Singleton.instance = this;
    }
  
    static getInstance(data) {
      Singleton.lock.acquire();
      return Singleton.instance || new Singleton(data);
    }
  }
  
  // Mutex lock implementation
  class Mutex {
    lock = false;
  
    acquire() {
      if (!this.lock) {
        this.lock = true;
      }
    }
  
    release() {
      if (this.lock) {
        this.lock = false;
      }
    }
  }
  
  //Double check locking
  // Double check locking is a technique used to reduce the overhead of acquiring a lock every time the getInstance method is called. Here is an example of double check locking in the singleton pattern:
  class Singleton {
    static instance;
    static lock = new Mutex();
  
    constructor(data) {
      if (Singleton.instance) {
        return Singleton.instance;
      }
  
      this.data = data;
  
      Singleton.instance = this;
    }
  
    static getInstance(data) {
      if (!Singleton.instance) {
        Singleton.lock.acquire();
        if (!Singleton.instance) {
          Singleton.instance = new Singleton(data);
        }
        Singleton.lock.release();
      }
      return Singleton.instance;
    }
  }
  