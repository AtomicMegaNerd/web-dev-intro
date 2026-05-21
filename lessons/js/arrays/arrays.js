const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Iterating
for (const day of days) {
  console.log(day);
}

// Length
console.log(days.length);

// Combinators map, filter, reduce (fold)
// Use for pure functions
console.log(days.map((day) => day.toLowerCase()));

// Join
const fun = days.join(" | ");
console.log(fun);
