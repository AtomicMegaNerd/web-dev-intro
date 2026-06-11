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

    // If the guess buffer is not full append otherwise replace
    if (this.guess.length !== wordLen) {
      this.guess += letter;
    } else {
      this.guess = this.guess.slice(0, -1) + letter;
    }

    // Only increment to the next row if we are not already on the last column
    if (this.col < wordLen - 1) {
      this.col++;
    }
  },

  backspace() {
    if (this.col > 0 && this.guess.length !== wordLen) {
      this.col--;
    }
    this.cell().textContent = "";
    this.guess = this.guess.slice(0, -1);
  },

  async checkGuess() {
    // We can only check the guess if it has required # of letters
    if (this.guess.length !== wordLen) {
      return;
    }

    // If the word is not valid we don't submit it
    if (!(await this.validateWord())) {
      return;
    }

    // Check for exact and partial matches
    this.checkMatchingLetters();

    if (this.guess === this.word) {
      this.victory();
      return;
    }

    if (this.row === numGuesses - 1) {
      this.defeat();
    }

    this.col = 0;
    this.row++;
    this.guess = "";
  },

  victory() {
    document.querySelector(".game-title").classList.add("victory-animation");
    alert(`The word was ${this.word}, you won! Congratulations!`);
    this.gameOver = true;
  },

  defeat() {
    alert(`The word was ${this.word}. Sorry you lost.`);
    this.gameOver = true;
  },

  // Get the gameCell element
  cell(col = this.col, row = this.row) {
    return document.querySelector(`.game-cell-${col + row * wordLen}`);
  },

  // This maps the frequency of each present letter in our word
  buildWordFreqMap() {
    // This map has the number of times each letter appears
    const wordMap = {};
    for (const ch of this.word) {
      wordMap[ch] = (wordMap[ch] || 0) + 1;
    }
    return wordMap;
  },

  checkMatchingLetters() {
    const wordMap = this.buildWordFreqMap();

    // First pass, we check for exact matches
    for (let ix = 0; ix < this.guess.length; ix++) {
      const letter = this.guess[ix];
      if (this.word[ix] === letter) {
        this.cell(ix, this.row).classList.add("exact-match");
        wordMap[letter]--;
      }
    }

    // Second pass, we check for partial matches
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

  // linter changed this form const key = event.key;
  const { key } = event;
  const letter = key.toUpperCase();
  const isLetter = /^[A-Z]$/.test(letter);

  switch (key) {
    case "Backspace": {
      gameState.backspace();
      break;
    }
    case "Enter": {
      gameState.checkGuess();
      break;
    }
    default: {
      if (!isLetter) {
        event.preventDefault();
        return;
      }
      gameState.addLetter(letter);
    }
  }
});
