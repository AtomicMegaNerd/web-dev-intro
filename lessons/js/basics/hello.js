const greeting = "Hello World!";

const firstName = "Chris";
const lastName = "Dunphy";

console.log(greeting);

// String interpolation, string concat works but why do that like an animal?
const sentence = `Hello ${firstName} ${lastName}! How are you!?`;

console.log(sentence);

// Define some variables
let x = 9;
let y = 7;

if (x !== y) {
  console.log(`${x} is not equal to ${y}.`);
} else {
  console.log(`${x} is equal to ${y}.`);
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
const mul = function(x, y) {
  return x * y;
};

// Yet another syntax
const div = (x, y) => {
  return x / y;
};

console.log(add(3, 4));
console.log(mul(3, 4));
console.log(div(6, 2));
