// querySelector finds the first match
const redSquare = document.querySelector(".red-square");

// Satisfies the type checker
if (redSquare instanceof HTMLElement) {
  redSquare.style.backgroundColor = "limegreen";
}

const blueSquare = document.querySelector(".blue-square");
if (blueSquare instanceof HTMLElement) {
  // This adds a class to the element at runtime instead of overriding an existing class.
  // This is a great way to implement dark mode
  blueSquare.classList.add("dark-mode");
}

// querySelectorAll will get all matching elements in a list
const elementsToChange = document.querySelectorAll(".js-target");
for (const el of elementsToChange) {
  // innerText is deprecated, use textContent
  el.textContent = "Modified by JavaScript!";
}
