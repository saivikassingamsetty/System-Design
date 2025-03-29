// Define a simple collection class with an iterator
class NumberCollection {
  numbers: number[];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  createIterator() {
    return new NumberIterator(this.numbers);
  }
}

// Define the iterator class
class NumberIterator {
  numbers: number[];
  currentPosition: number;

  constructor(numbers: number[]) {
    this.numbers = numbers;
    this.currentPosition = 0;
  }

  hasNext() {
    return this.currentPosition < this.numbers.length;
  }

  next() {
    if (this.hasNext()) {
      return this.numbers[this.currentPosition++];
    }
    return null;
  }
}

// Example usage
const collection = new NumberCollection([1, 2, 3, 4, 5]);
const iterator = collection.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
