// oxlint-disable max-statements

const getWordURL = "https://words.dev-apis.com/word-of-the-day";
const validateWordURL = "https://words.dev-apis.com/validate-word";
const wordLen = 5;
const numGuesses = 6;

const gameState = {
  word: "",
  col: 0,
  row: 0,
  guess: "",
  gameOver: false,

  // This starts the game fresh
  async initGame() {
    await this.fetchWord();
    this.col = 0;
    this.row = 0;
    this.guess = "";
    this.gameOver = false;
  },

  addLetter(ltr) {
    const letter = ltr.toUpperCase();
    this.cell().textContent = letter;

    // If we are not in the last column append
    if (!this.guessReady()) {
      this.guess += letter;
    } else {
      this.guess = this.guess.slice(0, -1) + letter;
    }

    // Only increment to the next row if we are not already on the last column
    if (this.col < wordLen - 1) {
      this.col++;
    }
  },

  guessReady() {
    return this.guess.length === wordLen;
  },

  backspace() {
    if (this.col > 0 && !this.guessReady()) {
      this.col--;
    }
    this.cell().textContent = "";
    this.guess = this.guess.slice(0, -1);
  },

  async checkGuess() {
    // We can only check the guess if we are on the last column
    if (!this.guessReady()) {
      console.log(`Guess not yet ${wordLen} letters long`);
      return;
    }

    if (!(await this.validateWord())) {
      console.log("Invalid word");
      return;
    }

    this.checkMatchingLetters();

    if (this.guess === this.word) {
      console.log("*** WIN!!!! ***");
      this.gameOver = true;
      return;
    }

    if (this.row === numGuesses - 1) {
      console.log("*** LOSE!!!! ***");
      this.gameOver = true;
      return;
    }

    console.log("Incorrect guess - on to next row");
    this.col = 0;
    this.row++;
    this.guess = "";
  },

  cell(col = this.col, row = this.row) {
    console.log(`Getting cell ${col + row * wordLen}`);
    return document.querySelector(`.game-cell-${col + row * wordLen}`);
  },

  getWordMap() {
    // This map has the number of times each letter appears
    const wordMap = {};
    for (const ch of this.word) {
      if (!wordMap[ch]) {
        wordMap[ch] = 1;
      } else {
        wordMap[ch] += 1;
      }
    }
    return wordMap;
  },

  checkMatchingLetters() {
    const wordMap = this.getWordMap();
    for (let ix = 0; ix < this.guess.length; ix++) {
      const letter = this.guess[ix];
      if (this.word[ix] === letter) {
        this.cell(ix, this.row).classList.add("exact-match");
        wordMap[letter]--;
      }
    }

    for (let ix = 0; ix < this.guess.length; ix++) {
      const letter = this.guess[ix];
      const cell = this.cell(ix, this.row);
      // Skip exact matches
      if (this.word[ix] !== letter) {
        // If partial match
        if (wordMap[letter] > 0) {
          cell.classList.add("partial-match");
          wordMap[letter]--;
        } else {
          cell.classList.add("no-match");
        }
      }
    }
  },

  async fetchJSON(url, options) {
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      return await resp.json();
    } catch (error) {
      console.log(`error calling our api ${error.message}`);
      throw error;
    }
  },

  async fetchWord() {
    const respJson = await this.fetchJSON(getWordURL);
    if (respJson) {
      this.word = respJson.word.toUpperCase();
    }
  },

  async validateWord() {
    if (this.guess.length !== wordLen) {
      console.log(`All guesses must be ${wordLen} long`);
      return;
    }

    const respJson = await this.fetchJSON(validateWordURL, {
      method: "POST",
      body: JSON.stringify({ word: this.guess }),
    });
    if (respJson) {
      return respJson.validWord;
    }
  },
};

// Init the state of the game
gameState.initGame();

// Register our event listener
document.addEventListener("keydown", (event) => {
  if (gameState.gameOver) {
    return;
  }
  const { key } = event;
  const letter = key.toUpperCase();
  const isLetter = /^[A-Z]$/.test(letter);

  const keyActions = {
    Backspace: () => gameState.backspace(),
    Enter: () => gameState.checkGuess(),
  };

  if (keyActions[key]) {
    keyActions[key]();
    return;
  }

  if (!isLetter) {
    event.preventDefault();
    return;
  }
  gameState.addLetter(letter);

  console.log(gameState.str());
});
