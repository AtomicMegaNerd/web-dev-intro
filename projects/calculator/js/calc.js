console.log("initializing calc");

const calc = {
  // We operate the operands like a stack FIFO
  operands: [],
  operator: this.noop,

  noop() {
    // Do nothing
  },

  clr() {
    this.operands = [];
    this.operator = this.noop;
  },

  add() {
    const lhs = parseInt(this.operands.pop());
    const rhs = parseInt(this.operands.pop());
    const res = lhs + rhs;
    this.operands.push(`${res}`);
    return res;
  },

  mul() {
    const lhs = parseInt(this.operands.pop());
    const rhs = parseInt(this.operands.pop());
    const res = lhs * rhs;
    this.operands.push(`${res}`);
    return res;
  },

  sub() {
    const lhs = parseInt(this.operands.pop());
    const rhs = parseInt(this.operands.pop());
    const res = lhs - rhs;
    this.operands.push(`${res}`);
    return res;
  },

  toString() {
    return `calc: operands=${this.operands}, operator=${this.operator}`;
  },
};

// This is the output window
const calcOutput = document.querySelector(`.calc-output`);

// Resister all of the number buttons
for (let ix = 0; ix <= 9; ix++) {
  const button = document.querySelector(`.button-${ix}`);
  button.addEventListener("click", () => {
    calcOutput.textContent += `${ix}`;
    console.log(`clicked ${ix}. ${calc}`);
  });
}

// Register the standard operators
const operators = ["mul", "add", "sub"];
for (const operator of operators) {
  const button = document.querySelector(`.button-${operator}`);
  if (!button) {
    console.log(`button-${operator} selector not found`);
  }
  button.addEventListener("click", () => {
    calc.operands.push(calcOutput.textContent);
    // We can use [] syntax to set the operator method by string :-)
    calc.operator = calc[operator];
    calcOutput.textContent = "";
    console.log(`clicked ${operator}. ${calc}`);
  });
}

const back = document.querySelector(`.button-back`);
back.addEventListener("click", () => {
  const val = calcOutput.textContent;
  calcOutput.textContent = val.slice(0, -1);
  console.log(`clicked back. ${calc}`);
});

const clear = document.querySelector(`.button-clear`);
clear.addEventListener("click", () => {
  calc.clear();
  calc.operator = calc.noop;
  calcOutput.textContent = "0";
  console.log(`clicked clear. ${calc}`);
});

const equals = document.querySelector(`.button-equals`);
equals.addEventListener("click", () => {
  calcOutput.textContent = `${calc.operator()}`;
  console.log(`clicked equals. ${calc}`);
});

// Initial state
calcOutput.textContent = "0";
console.log("calc ready");
