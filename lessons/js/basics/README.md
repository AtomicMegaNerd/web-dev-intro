# Javascript Basics

## String Interpolation

Use backticks for string interpolation. Don't do string concat (even though you can).

```js
const `Hello ${firstName}!`;
```

## The Number Type

There is only one number type. See [Number - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

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

`var` declarations are hoisted and initialized to undefined. `let` is hoisted but accessing it
early throws a `ReferenceError` rather than silently returning undefined:

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

See [Equality - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness).

Quoting the article:

> Which operation you choose depends on what sort of comparison you are looking to perform. Briefly:
>
> * Double equals (==) will perform a type conversion when comparing two things, and will handle
    NaN, -0, and +0 specially to conform to IEEE 754 (so NaN != NaN, and -0 == +0);
> * Triple equals (===) will do the same comparison as double equals (including the special
    handling for NaN, -0, and +0) but without type conversion; if the types differ, false is
    returned.
> * Object.is() does no type conversion and no special handling for NaN, -0, and +0 (giving it the
    same behavior as === except on those special numeric values).
