import { styleText } from "node:util";

const log = {
  error: (msg) => console.error(styleText("red", msg)),
  warn: (msg) => console.warn(styleText("yellow", msg)),
  info: (msg) => console.info(styleText("cyan", msg)),
  debug: (msg) => console.debug(styleText("gray", msg)),
};

// JSON!
const person = {
  name: "Fred Smith",
  city: "Tokyo",
  age: 56,
};

console.log(person);

// Accessing properties
console.log(person.name); // More common
console.log(person.name);

// This will be undefined :-)
console.log(person.doesNotExit);

const people = [
  {
    name: "Bob",
    age: 32,

    speak() {
      console.log("Hello there!");
    },
  },
  {
    name: "Tina",
    age: 37,

    speak() {
      console.log("Greetings!");
    },
  },
  {
    name: "强火",
    age: 26,

    speak() {
      console.log("大家好!");
    },

    // The longer version
    // speak: function() {
    //   console.log("你好!");
    // }
  },
];

for (const person of people) {
  person.speak();
}

// Hey! console has logging levels
log.debug("deubg info");
log.info("indo info");
log.warn("warn info");
log.error("error info");
