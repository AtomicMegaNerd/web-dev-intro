console.log("initializing calc");

const noop = "noop";
const mult = "mul";
const sub = "sub";
const plus = "add";

// Calculator uses numbers internally, but it takes string arguments
// from the page and returns string results to the page.
const calc = {
  store: "0",
  operator: noop,

  clr() {
    this.store = "0";
    this.operator = noop;
    return this.store;
  },

  op(val) {
    if (this.operator === noop) {
      return;
    }

    let lhs = parseInt(this.store);
    const rhs = parseInt(val);

    switch (this.operator) {
      case mult: {
        lhs *= rhs;
        break;
      }
      case sub: {
        lhs -= rhs;
        break;
      }
      case plus: {
        lhs += rhs;
        break;
      }
    }
    this.store = `${lhs}`;
    return this.store;
  },

  toString() {
    return `calc: store=[${this.store}], operator=${this.operator}`;
  },
};

const calcOutput = document.querySelector(`.calc-output`);

// Resister all of the number buttons
for (let ix = 0; ix <= 9; ix++) {
  const button = document.querySelector(`.button-${ix}`);
  button.addEventListener("click", () => {
    // Strip out the leading zero as soon as we enter numbers
    if (calcOutput.textContent === "0") {
      calcOutput.textContent = `${ix}`;
    } else {
      calcOutput.textContent += `${ix}`;
    }
    console.log(`${ix}. ${calc}`);
  });
}

// Register the standard operators
const operators = [mult, plus, sub];
for (const operator of operators) {
  const button = document.querySelector(`.button-${operator}`);
  button.addEventListener("click", () => {
    calc.store = calcOutput.textContent;
    calc.operator = operator;
    calcOutput.textContent = "0";
    console.log(`${operator}. ${calc}`);
  });
}

const back = document.querySelector(`.button-back`);
back.addEventListener("click", () => {
  calcOutput.textContent = calcOutput.textContent.slice(0, -1);
  if (calcOutput.textContent.length === 0) {
    calcOutput.textContent = "0";
  }
  console.log(`back. ${calc}`);
});

const clear = document.querySelector(`.button-clear`);
clear.addEventListener("click", () => {
  calcOutput.textContent = calc.clr();
  console.log(`clear. ${calc}`);
});

const equals = document.querySelector(`.button-equals`);
equals.addEventListener("click", () => {
  // Push the second operand before calculating
  const rhs = calcOutput.textContent;
  calcOutput.textContent = calc.op(rhs);
  console.log(`equals: ${rhs} ${calc}`);
});

// Initial state
calcOutput.textContent = calc.store;
console.log(`calc ready: ${calc}`);
