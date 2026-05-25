const eventButton = document.querySelector(".event-button");
if (eventButton) {
  // The function in the second argument is a callback
  eventButton.addEventListener("click", () => {
    // Don't use alerts they are horrifying
    alert("Hey there");
  });
}

const pSrc = document.querySelector(".p-copy-src");
const pTarget = document.querySelector(".p-copy-target");
if (pSrc && pTarget) {
  pSrc.addEventListener("keyup", () => {
    pTarget.textContent = pSrc.value;
  });
}

const colorBoxColorSrc = document.querySelector(".color-box-color-src");
const colorBox = document.querySelector(".color-box");

if (colorBoxColorSrc && colorBox) {
  console.log("changing color...");
  colorBoxColorSrc.addEventListener("change", () => {
    colorBox.style.backgroundColor = colorBoxColorSrc.value;
  });
}

// Event delegation - events bubble up to parents by default, so let's register
// a click listner on the bottun-container div that contains the buttons.
document.querySelector(".button-container").addEventListener("click", () => {
  // Only fire if this is a button
  if (event.target instanceof HTMLButtonElement) {
    alert(`You clicked on button ${event.target.textContent}`);
  }
});
