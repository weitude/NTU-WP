import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [usedChars, setUsedChars] = useState(Array(30).fill(0));
  const [curGuess, setCurGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [guesses, setGuesses] = useState([...Array(6)]);

  const printTest = () => {
    console.log("*-----------------------*");
    console.log("solution: ", solution);
    console.log("turn: ", turn);
    console.log("usedChars:", usedChars);
    console.log("curGuess: ", curGuess);
    console.log("isCorrect: ", isCorrect);
    console.log("guesses: ", guesses);
  };

  const retColor = (type) => {
    if (type === 0) return "grey";
    else if (type === 1) return "yellow";
    else if (type === 2) return "green";
  };

  const toInt = (ch) => {
    let ascii = ch.charCodeAt(0) - 97;
    if (ascii < 0) ascii += 32;
    return ascii;
  };

  const handleEnter = () => {
    if (turn > 5) {
      console.log("Error: You have used all your guesses");
      return;
    }
    if (curGuess.length !== 5) {
      console.log("Error: Only ", curGuess.length, " characters are entered!");
      return;
    }

    let colors = Array(5).fill(0); // 1 yellow 2 green
    let set = Array(30).fill(0);
    for (let i = 0; i < 5; i++) {
      set[toInt(solution[i])]++;
    }
    for (let i = 0; i < 5; i++) {
      if (curGuess[i] === solution[i]) {
        colors[i] = 2;
        set[toInt(solution[i])]--;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (colors[i] === 2) continue;
      let ascii = toInt(solution[i]);
      for (let j = 0; j < 5; j++) {
        if (curGuess[i] === solution[j] && set[ascii] > 0) {
          colors[i] = 1;
          set[ascii]--;
          break;
        }
      }
    }
    let newGuesses = JSON.parse(JSON.stringify(guesses));
    newGuesses[turn] = [
      { char: curGuess[0], color: retColor(colors[0]) },
      { char: curGuess[1], color: retColor(colors[1]) },
      { char: curGuess[2], color: retColor(colors[2]) },
      { char: curGuess[3], color: retColor(colors[3]) },
      { char: curGuess[4], color: retColor(colors[4]) },
    ];
    setGuesses(newGuesses);
    setTurn(turn + 1);
    let newUsedChars = JSON.parse(JSON.stringify(usedChars));
    for (let i = 0; i < 5; i++) {
      let ascii = toInt(curGuess[i]);
      if (newUsedChars[ascii] < colors[i]) newUsedChars[ascii] = colors[i];
    }
    setUsedChars(newUsedChars);

    if (curGuess === solution) setIsCorrect(true);

    setCurGuess("");
  };

  const handleBackspace = () => {
    setCurGuess(curGuess.substring(0, curGuess.length - 1));
  };

  const handleCharacter = (key) => {
    if (curGuess.length < 5) {
      setCurGuess(curGuess + key);
    }
  };
  const handleKeyup = ({ key }) => {
    if (key === "Enter") handleEnter();
    else if (key === "Backspace") handleBackspace();
    else if (/^[A-Za-z]$/.test(key)) handleCharacter(key);
  };
  return {
    turn,
    curGuess,
    guesses,
    isCorrect,
    usedChars,
    handleKeyup,
    printTest,
  };
};

export default useWordle;
