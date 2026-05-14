# Javascript Basics

Use backticks for string interpolation.

```javascript
const `Hello ${firstName}!`;
```

There is only one number type. See [Number - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

```javascript
255; // two-hundred and fifty-five
255.0; // same number
255 === 255.0; // true
255 === 0xff; // true (hexadecimal notation)
255 === 0b11111111; // true (binary notation)
255 === 0.255e3; // true (decimal exponential notation)
```

It is a double-precision floating point IEEE 754 under the hood. Yikes.
