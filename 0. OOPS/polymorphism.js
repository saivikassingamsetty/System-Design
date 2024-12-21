//method overloading
class Math {
  add(a, b) {
    return a + b;
  }
  add(a, b, c) {
    return a + b + c;
  }
}

const math = new Math();
console.log(math.add(2, 3)); // NaN

//we can't overload methods in javascript, it will take the last method
// if we want to overload methods, we can use default parameters
class Math2 {
  add(a, b, c = 0) {
    return a + b + c;
  }
}

const math2 = new Math2();
console.log(math2.add(2, 3)); // 5
console.log(math2.add(2, 3, 4)); // 9
