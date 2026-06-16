const getWordURL = "https://words.dev-apis.com/word-of-the-day";
const validateWordURL = "https://words.dev-apis.com/validate-word";
const wordLen = 5;
const numGuesses = 6;

const title = document.querySelector(".game-title");
const loading = document.querySelector(".refresh-icon");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cells
const getCell = (col, row) => document.querySelector(`.game-cell-${col + row * wordLen}`);
const setCell = (col, row, text) => (getCell(col, row).textContent = text);

// Rows
const flashWrong = async (row) => {
  const gameRow = document.querySelector(`.game-row-${row}`);
  gameRow.classList.add("wrong-answer");
  await sleep(500);
  gameRow.classList.remove("wrong-answer");
};

const game = {
  word: "",
  guess: "",
  row: 0,
  gameOver: false,

  // This starts the game fresh
  async initGame() {
    this.word = await fetchWord();
    this.guess = "";
    this.row = 0;
    this.gameOver = false;
  },

  addLetter(letter) {
    if (this.guess.length !== wordLen) {
      setCell(this.guess.length, this.row, letter);
      this.guess += letter;
    } else {
      this.guess = this.guess.slice(0, -1) + letter;
    }
  },

  backspace() {
    if (this.guess.length !== 0) {
      this.guess = this.guess.slice(0, -1);
      setCell(this.guess.length, this.row, "");
    }
  },

  async checkGuess() {
    if (this.guess.length !== wordLen) {
      flashWrong(this.row);
      return;
    }

    if (!(await validateWord(this.guess))) {
      flashWrong(this.row);
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
      return;
    }

    this.guess = "";
    this.row++;
  },

  victory() {
    title.classList.add("victory-animation");
    alert(`The word was ${this.word}, you won! Congratulations!`);
    this.gameOver = true;
  },

  defeat() {
    alert(`The word was ${this.word}.Sorry you lost.`);
    this.gameOver = true;
  },

  checkMatchingLetters() {
    // Build our map of each letter to the number of times it occurs
    const wordMap = buildWordMap(this.word);

    // First pass, we check for exact matches
    for (let ix = 0; ix < this.guess.length; ix++) {
      const letter = this.guess[ix];
      if (this.word[ix] === letter) {
        getCell(ix, this.row).classList.add("exact-match");
        wordMap[letter]--;
      }
    }

    // Second pass, we check for partial matches
    for (let ix = 0; ix < this.guess.length; ix++) {
      const letter = this.guess[ix];
      const cell = getCell(ix, this.row);
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
};

const buildWordMap = (word) => {
  const wordMap = {};
  for (const ch of word) {
    wordMap[ch] = (wordMap[ch] || 0) + 1;
  }
  return wordMap;
};

const fetchWord = async () => {
  const { word } = await fetchJSON(getWordURL);
  return word.toUpperCase();
};

const validateWord = async (word) => {
  if (word.length !== wordLen) {
    return;
  }
  const { validWord } = await fetchJSON(validateWordURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });
  return validWord;
};

const fetchJSON = async (url, options) => {
  try {
    loading.classList.remove("hidden");
    const resp = await fetch(url, options);
    if (!resp.ok) {
      throw new Error(`${resp.status} ${resp.statusText}`);
    }
    return await resp.json();
  } catch (error) {
    console.log(`error calling our api ${error.message}`);
    throw error;
  } finally {
    loading.classList.add("hidden");
  }
};

// Init the state of the game
game.initGame();

// Register our event listener
document.addEventListener("keydown", (event) => {
  // linter changed this form const key = event.key;
  const { key } = event;
  const letter = key.toUpperCase();
  const isLetter = /^[A-Z]$/.test(letter);

  switch (key) {
    case "Backspace": {
      game.backspace();
      break;
    }
    case "Enter": {
      game.checkGuess();
      break;
    }
    default: {
      if (!isLetter) {
        event.preventDefault();
        return;
      }
      game.addLetter(letter);
    }
  }
});
