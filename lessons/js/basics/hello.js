// oxlint-disable capitalized-comments
// oxlint-disable func-names
// oxlint-disable arrow-body-style
// oxlint-disable id-length
// oxlint-disable func-style
//
const greeting = "Hello World!";

const firstName = "Chris";
const lastName = "Dunphy";

console.log(greeting);

// String interpolation, string concat works but why do that like an animal?
const sentence = `Hello ${firstName} ${lastName}! How are you!?`;

console.log(sentence);

// Define some variables
let num1 = 9;
const num2 = 7;

// Let is mutable
num1 = 6;

// However const is nto mutable
// num2 = 7;

if (num1 !== num2) {
  console.log(`${num1} is not equal to ${num2}.`);
} else {
  console.log(`${num1} is equal to ${num2}.`);
}

// Back-ticks can be multi-line
const longStr = `
package main

import "fmt"

func main() {
  fmt.Println("Hello, world")
}
`;

console.log(longStr);

// Exercise - super basic
const character = "f";
const timesToRepeat = 5;
let message = "";

for (let i = 0; i < timesToRepeat; i++) {
  message += character;
}
console.log(message);

// Functions are what we expect
function add(x, y) {
  return x + y;
}

// Another syntax
const mul = function (x, y) {
  return x * y;
};

// Yet another syntax
const div = (x, y) => {
  return x / y;
};

console.log(add(3, 4));
console.log(mul(3, 4));
console.log(div(6, 2));

// Hey currying works!
const add2 = (x) => (y) => {
  return x + y;
};

const addTo5 = add2(5);

console.log(addTo5(4));
