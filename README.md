# Frontend Masters Web Development Course

## Introduction

See [course site](https://btholt.github.io/complete-intro-to-web-dev-v3/). This is the repo that I
created to save all of the work that I am doing for this course.

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

### vscode-langservers-extracted

This let's use use various LSP's for web development from Microsoft outside of VSCode:

[https://github.com/hrsh7th/vscode-langservers-extracted](https://github.com/hrsh7th/vscode-langservers-extracted)

### live-server

Run a small web-server from the command line.

[https://github.com/tapio/live-server](https://github.com/tapio/live-server)

### Typescript Go (Typscript 7)

In preview at the time I started this project. This has built-in LSP which is awesome!

[https://github.com/microsoft/typescript-go](https://github.com/microsoft/typescript-go)

### Prettier

Formatter for web development.

[https://prettier.io](https://prettier.io)

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
```

## Reference Links

### HTML and CSS

- [HTML and CSS Reference](./lessons/html/README.md)
- [CSS Flex](./lessons/html/flex/README.md)
- [CSS Grid](./lessons/html/grid/README.md)
- [CSS Animation](./lessons/html/animation/README.md)

### Javascript

- [JS Reference](./lessons/js/README.md)
- [JS Basics](./lessons/js/basics/README.md)

## Todo

- [ ] Setup nix flake on my personal MBA.
