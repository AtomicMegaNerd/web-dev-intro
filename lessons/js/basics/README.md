# Javascript Basics

Notes on some of the lessons I learned from the lessons.

## String Interpolation

Use backticks for string interpolation. Don't do string concat (even though you can). They call
these template-strings. Came with ES6.

```js
const `Hello ${firstName}!`;
```

Back-ticks are also multi-line:

```js
// Back-ticks can be multi-line
const longStr = `
package main

import "fmt"

func main() {
  fmt.Println("Hello, world")
}
`;
```

## The Number Type

There is only one number type. See
[Number - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

It is a double-precision floating point IEEE 754 under the hood. Yikes.

```js
255; // two-hundred and fifty-five
255.0; // same number
255 === 255.0; // true
255 === 0xff; // true (hexadecimal notation)
255 === 0b11111111; // true (binary notation)
255 === 0.255e3; // true (decimal exponential notation)
```

## Variables

```js
const x = 3; // immmutable
let y = 4; // mutable
var z = 9; // old-way for mutable don't use in new code.
```

In 2015 ES6 introduced let. There are 4 primary reasons why.

### 1. Block Scoping

`var` is function-scoped, `let` is block-scoped `{}`. This prevents variables from leaking out of
loops and conditionals:

```js
for (var i = 0; i < 3; i++) {}
console.log(i); // 3 — oops, leaked!

for (let j = 0; j < 3; j++) {}
console.log(j); // ReferenceError — as expected
```

### 2. No Hoisting Surprises

`var` declarations are hoisted and initialized to undefined. `let` is hoisted but accessing it early
throws a `ReferenceError` rather than silently returning undefined:

```js
console.log(x); // undefined (var hoisting)
var x = 5;

console.log(y); // ReferenceError (TDZ)
let y = 5;
```

### 3. No Re-declaration

`var` lets you accidentally re-declare the same variable; `let` throws a `SyntaxError`:

```js
var a = 1;
var a = 2; // silent, no error

let b = 1;
let b = 2; // SyntaxError
```

### 4. Safer in Closures/Loops

Classic closure-in-loop bug disappears with let because each iteration gets its own binding.

## Equality

See
[Equality - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness).

Quoting the article:

> Which operation you choose depends on what sort of comparison you are looking to perform. Briefly:
>
> - Double equals (==) will perform a type conversion when comparing two things, and will handle

    NaN, -0, and +0 specially to conform to IEEE 754 (so NaN != NaN, and -0 == +0);

> - Triple equals (===) will do the same comparison as double equals (including the special

    handling for NaN, -0, and +0) but without type conversion; if the types differ, false is
    returned.

> - Object.is() does no type conversion and no special handling for NaN, -0, and +0 (giving it the

    same behavior as === except on those special numeric values).

## Loading

The best order to load web pages is:

1. CSS
2. HTML
3. Javascript

The instructor recommends loading JS at the end of the body as it makes web pages load faster.

**NOTE: Modern alternative** — `defer` and `async` attributes: Today you'd typically keep scripts in
`<head>` but use these attributes instead:

```html
<!-- Downloads in parallel, executes after HTML is parsed -->
<script src="app.js" defer></script>

<!-- Downloads in parallel, executes immediately when ready (order not guaranteed) -->
<script src="analytics.js" async></script>
```

- `defer` is usually the best choice — same effect as bottom-of-body but cleaner
- `async` is good for independent scripts like analytics that don't depend on the DOM

The "put scripts at the bottom of body" advice predates defer/async but is still valid and commonly
taught as the foundational concept.

## Functions

## 1. Function Declaration

```js
function add(x, y) {
  return x + y;
}
```

- **Hoisted** — callable before its definition in the file
- Has its own `this` binding
- Has `arguments` object

## 2. Function Expression

```js
const mul = function (x, y) {
  return x * y;
};
```

- **Not hoisted** (the `const` binding isn't usable before declaration)
- Has its own `this` binding
- Has `arguments` object
- Can be **named** (`const mul = function multiply(...)`) which helps with stack traces

## 3. Arrow Function

```js
const div = (x, y) => {
  return x / y;
};
```

- **Not hoisted**
- **Lexically inherits `this`** from the enclosing scope — the big differentiator
- No `arguments` object (use rest params `...args` instead)
- Cannot be used as a constructor (`new` throws)
- Concise form available: `const div = (x, y) => x / y;`

## Key Rule of Thumb

| Need                           | Use                                       |
| ------------------------------ | ----------------------------------------- |
| Top-level / utility functions  | Declaration or expression                 |
| Callbacks / short lambdas      | Arrow function                            |
| Object methods that use `this` | Declaration or expression (**not** arrow) |
| Class methods                  | Declaration syntax inside class           |

The `this` behavior is the most common gotcha — arrow functions are popular in React/callbacks
precisely _because_ they don't rebind `this`.
