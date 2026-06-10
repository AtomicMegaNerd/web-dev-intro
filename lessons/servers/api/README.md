# Making API requests from JS

## List of Public API's

- [public-apis](https://github.com/toddmotto/public-apis)

## Fetch - MDN

- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Promise - MDN

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Async/Await

- [Async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

This is how you call async/await functions from top-level of file:

```js
// Wrap it in an async anon function
(async () => {
  const word = await fetchWord();
  const isValid = await validateWord(word);
  console.log(`word: ${word}, is valid: ${isValid}`);
})();
```
