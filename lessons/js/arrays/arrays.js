const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Length
console.log(days.length);

// Combinators map, filter, reduce (fold)
// Use for pure functions
console.log(days.map((day) => day.toLowerCase()));

// Join
const fun = days.join(" | ");
console.log(fun);

// Iterating

// Old-school
console.log("\nold-school for loop");
for (let ix = 0; ix < days.length; ix++) {
  // You can pass as many arguments to console.log as you want
  console.log(ix, days[ix]);
}

// Example: forEach
console.log("\nforEach");
days.forEach((day) => {
  console.log(day);
});

// Example: for...of
console.log("\nfor...on");
for (const day of days) {
  console.log(day);
}

console.log("Combinators");
const nums = [42, 7, 91, 23, 56, 78, 3, 65, 14, 88, 31, 49, 72, 5, 97, 36, 60, 18, 83, 11];
const result = nums
  .filter((num) => num % 2 === 0)
  .map((num) => num * 10)
  .reduce((accum, num) => accum + num, 0);
console.log(result);
