const getWordURL = "https://words.dev-apis.com/word-of-the-day?random=1";
const validateWordURL = "https://words.dev-apis.com/validate-word";

const fetchWord = async () => {
  try {
    const resp = await fetch(getWordURL);
    if (resp.ok) {
      const respJson = await resp.json();
      return respJson.word;
    } else {
      throw new Error(`${resp.status} ${resp.statusText}`);
    }
  } catch (error) {
    console.log(`error calling our api ${error.message}`);
  }
};

const validateWord = async (word) => {
  try {
    const wordObj = {
      word,
    };
    const resp = await fetch(validateWordURL, {
      method: "POST",
      body: JSON.stringify(wordObj),
    });
    if (resp.ok) {
      const respJson = await resp.json();
      return respJson.validWord;
    } else {
      throw new Error(`${resp.status} ${resp.statusText}`);
    }
  } catch (error) {
    console.log(`error calling our api ${error.message}`);
  }
};

const isLetter = (ch) => /^[a-zA-Z]$/.test(ch);

// This is how you wrap your async/await at the top level of a file
(async () => {
  const randomWord = await fetchWord();
  const words = ["trees", randomWord, "roflsaucenotaword"];
  for (const word of words) {
    // oxlint-disable-next-line no-await-in-loop
    const isValid = await validateWord(word);
    if (isValid) {
      console.log(`${word} is valid`);
    }
  }

  console.log(`is 'a' a letter? ${isLetter("a")}`);
  console.log(`is 'Z' a letter? ${isLetter("Z")}`);
  console.log(`is '1' a letter? ${isLetter("1")}`);
})();
