console.log("initializing calc");

const noop = "noop";
const mult = "mul";
const sub = "sub";
const plus = "add";

// Calculator uses numbers internally, but it takes string arguments
// from the page and returns string results to the page.
const calc = {
  register: 0,
  operator: noop,
  ops: {
    mul: (lhs, rhs) => lhs * rhs,
    add: (lhs, rhs) => lhs + rhs,
    sub: (lhs, rhs) => lhs - rhs,
  },

  store(val) {
    this.register = parseInt(val, 10);
  },

  clr() {
    this.register = 0;
    this.operator = noop;
    return String(this.register);
  },

  op(val) {
    // No-op won't match
    const op_func = this.ops[this.operator];
    if (!op_func) {
      return String(this.register);
    }

    this.register = op_func(this.register, parseInt(val, 10));
    return String(this.register);
  },

  toString() {
    return `calc: register=[${this.register}], operator=${this.operator}`;
  },
};

// This is our calculator display
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
    if (calc.operator === noop) {
      calc.store(calcOutput.textContent);
    } else {
      calc.op(calcOutput.textContent);
    }
    calcOutput.textContent = "0";
    calc.operator = operator;
    console.log(`${operator}. ${calc}`);
  });
}

const equals = document.querySelector(`.button-equals`);
equals.addEventListener("click", () => {
  const val = calcOutput.textContent;
  calcOutput.textContent = calc.op(val);
  console.log(`equals: ${val} ${calc}`);
});

const back = document.querySelector(`.button-back`);
back.addEventListener("click", () => {
  calcOutput.textContent = calcOutput.textContent.slice(0, -1) || "0";
  console.log(`back. ${calc}`);
});

const clear = document.querySelector(`.button-clear`);
clear.addEventListener("click", () => {
  calcOutput.textContent = calc.clr();
  console.log(`clear. ${calc}`);
});

// Initial state
calcOutput.textContent = calc.clr();
console.log(`calc ready: ${calc}`);
