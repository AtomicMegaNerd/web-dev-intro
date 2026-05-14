# Javascript Reference

## Running JS from CLI using Node

To run any javascript file from cli:

```bash
node /path/to/file.js
```

## Running Node REPL

See [Node REPL Docs](https://nodejs.org/api/repl.html).

```bash
cd directory-with-js-files
node
```

### Useful Commands

The following special commands are supported by all REPL instances:

- `.break`: When in the process of inputting a multi-line expression, enter the .break command (or
  press Ctrl+C) to abort further input or processing of that expression.
- `.clear`: Resets the REPL context to an empty object and clears any multi-line expression being
  input.
- `.exit`: Close the I/O stream, causing the REPL to exit.
- `.help`: Show this list of special commands.
- `.save`: Save the current REPL session to a file: > .save ./file/to/save.js
- `.load`: Load a file into the current REPL session. > .load ./file/to/load.js
- `.editor`: Enter editor mode (Ctrl+D to finish, Ctrl+C to cancel).
