# Javascript Objects

## JS Object vs. JSON

|                     | JSON                                          | JS Object                                                    |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **Keys**            | Must be double-quoted                         | Quotes optional                                              |
| **Strings**         | Double quotes only                            | Single or double                                             |
| **Trailing commas** | ❌ Not allowed                                | ✅ Allowed                                                   |
| **Comments**        | ❌ None                                       | ✅ Allowed                                                   |
| **Values**          | string, number, bool, null, array, object     | All JS types (`undefined`, `Symbol`, `BigInt`, `Date`, etc.) |
| **What it is**      | Text serialization format (language-agnostic) | In-memory runtime data structure                             |

JSON is a **strict subset** of JS object literal syntax, designed for data interchange. JS objects
are richer runtime structures. `JSON.stringify()` silently drops values that don't fit the JSON spec
(e.g., `undefined`, functions).

## This

This is complicated. In an object it can refer to the instance of the object. In a browser global
this refers to the browser window object. In NodeJS it can be an empty object or undefined depending
if CommonJS or ES Modules are used.

## Reference Links

- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
