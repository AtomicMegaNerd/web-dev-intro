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
    return 0;
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
};

// This is the output window
const calcOutput = document.querySelector(`.calc-output`);

// Resister all of the number buttons
for (let ix = 0; ix <= 9; ix++) {
  const button = document.querySelector(`.button-${ix}`);
  button.addEventListener("click", () => {
    calcOutput.textContent += `${ix}`;
  });
}

// Register the standard operators
const operators = ["mul", "add", "sub"];
for (const operator of operators) {
  const button = document.querySelector(`.button-${operator}`);
  button.addEventListener("click", () => {
    calc.operands.push(calcOutput.textContent);
    // We can use [] syntax to set the operator method by string :-)
    calc.operator = calc[operator];
  });
}

const back = document.querySelector(`.button-back`);
back.addEventListener("click", () => {
  const val = calcOutput.textContent;
  calcOutput.textContent = val.slice(0, -1);
});

const clear = document.querySelector(`.button-clear`);
clear.addEventListener("click", () => {
  const res = calc.clear();
  calc.operator = calc.noop;
  calcOutput.textContent = `${res}`;
});

const equals = document.querySelector(`.button-equals`);
equals.addEventListener("click", () => {
  calcOutput.textContent = `${calc.operator()}`;
});
