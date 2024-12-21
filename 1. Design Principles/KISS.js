// Complex, hard to understand approach
const calculateAge = (birthDate) => {
  const now = new Date();
  const birth = new Date(birthDate);
  const diff = now - birth;
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// KISS approach - Simple and straightforward
const calculateAgeSimple = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  return today.getFullYear() - birth.getFullYear();
};

// Complex way to check if number is even
const isEvenComplex = (num) => {
  return !Boolean(num.toString(2).split("").pop() & 1);
};

// KISS way to check if number is even
const isEven = (num) => {
  return num % 2 === 0;
};

// Example usage
console.log(calculateAgeSimple("1990-01-01")); // Simple age calculation
console.log(isEven(4)); // Simple even number check

function calculateTotalPrice(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].price) {
      total += items[i].price * (items[i].quantity ? items[i].quantity : 1);
    } else {
      if (items[i].cost) {
        total += items[i].cost * (items[i].quantity ? items[i].quantity : 1);
      }
    }
  }
  return total;
}
// Before applying KISS principle
function calculateDiscountedTotalPrice(items, discount) {
  let total = calculateTotalPrice(items);
  if (discount) {
    total = total - (total * discount) / 100;
  }
  return total;
}

// After applying KISS principle
function calculateDiscountedTotalPrice(items, discount) {
  const total = calculateTotalPrice(items);
  return discount ? total * (1 - discount / 100) : total;
}

//Before applying KISS principle
function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  let average = sum / numbers.length;
  return average;
}

//After applying KISS principle
function calculateAverage(numbers) {
  return numbers.length
    ? numbers.reduce((acc, num) => acc + num, 0) / numbers.length
    : 0;
}
