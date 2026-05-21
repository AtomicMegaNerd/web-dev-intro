# JS Arrays

## Implementation

JS Arrays are like **dynamic hash maps** internally. They are actually objects with numeric string
keys:

```js
const arr = ["a", "b", "c"];
// Under the hood, roughly: { "0": "a", "1": "b", "2": "c", length: 3 }
```

### JS Arrays Properties

- Are very similar in structure to Lua tables!
- Dynamically resizable (like `Vec` / slices)
- Heterogeneous — `[1, "two", true, null]` is valid
- Sparse — `arr[1000] = "x"` doesn't allocate 1000 slots
- Really just objects with a magic `.length` property

### vs Go Slices / Rust Vec

| Feature            | Go/Rust       | JS Array                   |
| ------------------ | ------------- | -------------------------- |
| Contiguous memory  | ✅ Guaranteed | ❌ Not guaranteed          |
| Fixed element type | ✅            | ❌ Can mix types           |
| Capacity vs length | ✅            | ❌                         |
| Sparse             | ❌            | ✅ `arr[1000] = "x"` works |

### TypedArray

If you want actual typed contiguous memory, there's `TypedArray`:

```js
const buf = new Int32Array(100); // Real contiguous 32-bit ints
```

## Common built-ins

- **map**, **filter** - works as expected, best for pure functions
- **reduce** - this is fold
- **forEach** - for functions with side effects (prefer `for...of`).
- **push**, **pop** - use your array like a stack
- **find** - returns first element matching a predicate (like Rust's `.iter().find()`)
- **findIndex** - same but returns the index
- **some** - returns true if any element matches (like `.any()`)
- **every** - returns true if all elements match (like `.all()`)
- **includes** - simple value membership check (like `.contains()`)
- **indexOf** - index of a value, -1 if missing
- **flat** - flattens nested arrays by depth (`[[1,[2]],3].flat(Infinity)` → `[1,2,3]`)
- **flatMap** - `.map()` then `.flat(1)` in one pass
- **slice** - shallow copy a subrange (non-mutating)
- **splice** - insert/remove elements in place (mutating)
- **sort** - in-place sort (⚠️ lexicographic by default, pass a comparator)
- **reverse** - in-place reverse
- **join** - array to string with separator
- **from** - `Array.from(iterable)` — convert sets, maps, NodeLists, etc.

Not a built-in but this is deepCopy.

- **structuredClone** - deep copy (not on Array but worth knowing)

## Appending

### Mutating

- `arr.push(x)` — add to **end** (O(1))
- `arr.unshift(x)` — add to **front** (O(n) — re-indexes everything)

### The Proper Way

```js
const newArr = [...arr, x]; // append to end
const newArr = [x, ...arr]; // prepend to front
```

### Concatenation

```js
const combined = arr.concat(otherArr); // returns new array
```

In practice, `push` and spread are used constantly. `unshift` works but the name is terrible and the
performance is bad — if you're prepending a lot, you probably want a different data structure.

## Destructuring

```js
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]
```

## Spread for Shallow Copy

```js
const copy = [...arr]; // shallow clone — nested objects still shared
```

## Links

- [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
