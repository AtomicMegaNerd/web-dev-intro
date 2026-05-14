# Frontend Masters Web Development Course

## Introduction

See [course site](https://btholt.github.io/complete-intro-to-web-dev-v3/). This is the repo that
I created to save all of the work that I am doing for this course.

## Setup

### Nix

Just use direnv to set everything up from the included flake.

```bash
direnv allow .
```

### Non-Nix

On non-nix systems please use [mise-en-place](https://mise.jdx.dev/). After installing mise
you can install all of the tooling by:

```bash
mise trust .
mise install
```

## Running the Examples

To load any sites in this repo live:

```bash
live-server --no-browser /folder/with/html
```

To run any javascript file from cli:

```bash
node /path/to/file.js
```

## References

All of the references are in the course website linked above as well.

### HTML and CSS

#### Can I Use?

[https://caniuse.com/](https://caniuse.com/)

#### CSS Tricks

##### Flex Box

[https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

##### Grid

[https://css-tricks.com/complete-guide-css-grid-layout/](https://css-tricks.com/complete-guide-css-grid-layout/)
