# Frontend Masters Web Development Course

---

## Introduction

See [course site](https://btholt.github.io/complete-intro-to-web-dev-v3/). This is the repo that I
created to save all of the work that I am doing for this course.

---

## Tooling

The following tooling is installed with this repo and is used for this project. I use
[Neovim](https://neovim.io) so we need to install the various LSP's and linters for this project to
work.

### emmet-language-server

This LSP allows our editor to use [Emmet](https://docs.emmet.io/)

[https://github.com/olrtg/emmet-language-server](https://github.com/olrtg/emmet-language-server)

### htmlhint

This is the linter we use for the project.

[https://github.com/htmlhint/HTMLHint](https://github.com/htmlhint/HTMLHint)

### live-server

Run a small web-server from the command line (we use the Rust version):

[https://github.com/lomirus/live-server](https://github.com/lomirus/live-server)

### Typescript Go (TypeScript 7)

In preview at the time I started this project. This has built-in LSP which is awesome!

[https://github.com/microsoft/typescript-go](https://github.com/microsoft/typescript-go)

### oxfmt

Formatter for Markdown

[https://github.com/oxc-project/oxc](https://github.com/oxc-project/oxc)

### biome

LSP for web development.

[https://biomejs.dev/](https://biomejs.dev/)

### markdownlint-cli2

Linter for Markdown files.

[https://github.com/DavidAnson/markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)

---

## NodeJS

NodeJS is the runtime we are using for this course. We turn on module support to make this use
strict mode for safety.

```json
{
  "type": "module"
}
```

---

## Setup

### Nix

Just use direnv to set everything up from the included flake.

```bash
direnv allow .
```

### Non-Nix

On non-nix systems please use [mise-en-place](https://mise.jdx.dev/). After installing mise you can
install all of the tooling by:

```bash
mise trust .
mise install
mise setup
```

The last command setup will setup pre-commit

---

## Running Live server

In `mise.toml` set the `CURR_PROJECT` environment variable to the root of the current project in
this repo that you are working on:

```toml
[env]
CURR_PROJECT="./projects/word-masters"
```

_NOTE_ Always set CURR_PROJECT to the root directory of each project that contains `index.html` and
the other files. Never set it to the index file or other resources like CSS or Javascript will not
load correctly.

Then from the command-line you can use mise to run the app (see the custom `serve` task in the
`mise.toml` file)

```fish
mise serve
```

---

## Lessons

All the lessons broken down by course section:

### HTML and CSS

- [HTML and CSS Reference](./lessons/html/README.md)
- [CSS Flex](./lessons/html/flex/README.md)
- [CSS Grid](./lessons/html/grid/README.md)
- [CSS Animation](./lessons/html/animation/README.md)

### Javascript

- [JS Reference](./lessons/js/README.md)
- [JS Basics](./lessons/js/basics/README.md)
- [JS Objects](./lessons/js/objects/README.md)

### Front-End Development

- [The DOM](./lessons/front-end/dom/README.md)
- [Events](./lessons/front-end/events/README.md)

### Talking to Servers

- [API's](./lessons/servers/api/README.md)
- [JSON](./lessons/servers/json/README.md)

## Projects

These are the exercises that are part of the course:

- [RCD Blog](./projects/blog/README.md)
- [Coffeee Masters](./projects/coffee/README.md)
- [Calculator](./projects/calculator/README.md)
- [Word Masters](./projects/word-masters/README.md)
