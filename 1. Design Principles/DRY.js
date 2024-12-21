// Example 1: Without DRY principle
function calculateAreaOfSquare(side) {
  return side * side;
}

function calculateAreaOfRectangle(length, width) {
  return length * width;
}

// Example 2: Applying DRY principle
function calculateArea(shape, ...dimensions) {
  switch (shape) {
    case "square":
      return dimensions[0] * dimensions[0];
    case "rectangle":
      return dimensions[0] * dimensions[1];
    default:
      throw new Error("Unknown shape");
  }
}

// Usage
const squareArea = calculateArea("square", 4);
const rectangleArea = calculateArea("rectangle", 4, 5);

console.log(`Area of square: ${squareArea}`);
console.log(`Area of rectangle: ${rectangleArea}`);

// Bad Example - Violating DRY principle
class UserManager {
  saveUserToDatabase(user) {
    // Validation logic repeated in multiple places
    if (!user.name || !user.email || !user.age) {
      throw new Error("Invalid user data");
    }
    // Save to database
    console.log("Saving user to database...");
  }

  updateUserInDatabase(user) {
    // Same validation logic repeated
    if (!user.name || !user.email || !user.age) {
      throw new Error("Invalid user data");
    }
    // Update in database
    console.log("Updating user in database...");
  }
}

// Good Example - Following DRY principle
class ImprovedUserManager {
  validateUser(user) {
    if (!user.name || !user.email || !user.age) {
      throw new Error("Invalid user data");
    }
  }

  saveUserToDatabase(user) {
    this.validateUser(user);
    console.log("Saving user to database...");
  }

  updateUserInDatabase(user) {
    this.validateUser(user);
    console.log("Updating user in database...");
  }
}

// Usage
const userManager = new ImprovedUserManager();
const user = { name: "John", email: "john@example.com", age: 30 };
userManager.saveUserToDatabase(user);
