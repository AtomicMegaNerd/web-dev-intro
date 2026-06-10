// oxlint-disable max-statements
// const getWordURL = "https://words.dev-apis.com/word-of-the-day?random=1";
// const validateWordURL = "https://words.dev-apis.com/validate-word";
//
// const fetchWord = async () => {
//   try {
//     const resp = await fetch(getWordURL);
//     if (resp.ok) {
//       const respJson = await resp.json();
//       return respJson.word;
//     } else {
//       throw new Error(`${resp.status} ${resp.statusText}`);
//     }
//   } catch (error) {
//     console.log(`error calling our api ${error.message}`);
//   }
// };
//
// const validateWord = async (word) => {
//   try {
//     const wordObj = {
//       word,
//     };
//     const resp = await fetch(validateWordURL, {
//       method: "POST",
//       body: JSON.stringify(wordObj),
//     });
//     if (resp.ok) {
//       const respJson = await resp.json();
//       return respJson.validWord;
//     } else {
//       throw new Error(`${resp.status} ${resp.statusText}`);
//     }
//   } catch (error) {
//     console.log(`error calling our api ${error.message}`);
//   }
// };

// oxlint-disable-next-line no-unused-vars
const isLetter = (ch) => /^[a-zA-Z]$/.test(ch);

const gameState = {
  word: "",
  currCell: 0,
  rowBuffer: "",
};

const getKeyFromCurrentCell = async (cell) => {
  cell.addEventListener("keydown", (event) => event);
};

const clearListenerFromCell = (cell) => {
  cell.replaceWith(cell.cloneNode(true));
};

console.log("ready to go...");

(async () => {
  while (true) {
    const cell = document.querySelector(`.game-cell-${gameState.currCell}`);
    console.log(`current cell is .game-cell-${gameState.currCell}`);
    // oxlint-disable-next-line no-await-in-loop
    const event = await getKeyFromCurrentCell(cell);

    if (event instanceof KeyboardEvent) {
      switch (event.key) {
        case "Backspace": {
          cell.textContent = "";
          clearListenerFromCell(cell);
          gameState.currCell--;
        }
        default: {
          if (!isLetter(event.key)) {
            event.preventDefault();
          } else {
            cell.textContent = event.key;
          }
          gameState.currCell++;
        }
      }
    }
  }
})();
