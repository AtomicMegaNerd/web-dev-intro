const greeting = "Hello World!"

const firstName = "Chris";
const lastName = "Dunphy";

console.log(greeting)

// String interpolation, string concat works but why do that like an animal?
const sentence = `Hello ${firstName} ${lastName}! How are you!?`;

console.log(sentence)

// Define some variables
let x = 9
let y = 7

if (x !== y) {
  console.log(`${x} is not equal to ${y}.`)
} else {
  console.log(`${x} is equal to ${y}.`)
}
