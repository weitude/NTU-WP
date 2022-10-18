/****************************************************************************
 FileName      [ useWordle.js ]
 PackageName   [ src/components/hook ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file handles each action in the Wordle game. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import React, {useState} from 'react';


const useWordle = (solution) =>
{
    const [turn, setTurn] = useState(0);                            // An integer whose default is 0. 0 <= turn <= 5.
    const [usedChars, setUsedChars] = useState(Array(30).fill(0));                 // A dictionary object which store characters' color that showed on the keyboard. (Ex: {e: 'yellow', c:'grey'})
    const [curGuess, setCurGuess] = useState("");                   // A string whose default is "". 0 <= curGuess.length <= 5.
    const [isCorrect, setIsCorrect] = useState(false);              // A bool whose default is false. It will be set true only when curGuess === solution.
    const [guesses, setGuesses] = useState([...Array(6)]);          // An array whose length is 6. (Ex: [[{char:'c', color:'grey'},{char:'o', color:'grey'},{char:'d', color:'grey'},{char:'e', color:'yellow'},{char:'s', color:'grey'}],[],[],[],[],[]])

    // You can use this function to print all the parameters you want to know.
    const printTest = () =>
    {
        console.log("*-----------------------*");
        console.log("solution: ", solution);
        console.log("turn: ", turn);
        console.log("usedChars:", usedChars);
        console.log("curGuess: ", curGuess);
        console.log("isCorrect: ", isCorrect);
        console.log("guesses: ", guesses);
    }

    const retColor = (type) =>
    {
        if (type === 0)
            return "grey"
        else if (type === 1)
            return "yellow"
        else if (type === 2)
            return "green"
    }


    // Handle the actions of `Enter`
    const handleEnter = () =>
    {
        // (1) Enter is invalid if turn > 5
        if (turn > 5)
        {
            console.log("Error: You have used all your guesses");
            return;
        }
        // (2) Enter is invalid if curGuess is not a 5-character string
        if (curGuess.length !== 5)
        {
            console.log("Error: Only ", curGuess.length, " characters are entered!");
            return;
        }
        // (3) Press Enter, store curGuess to guesses, reset curGuess and update parameters .

        console.log("Press Enter!!!! Store and reset curGuess!");
        // TODO 4: Check each wordbox's color in `curGuess` and update `guess`, `turn` and `curGuess`
        // Hint: check green first, and then check yellow.
        console.log(curGuess)
        let colors = Array(5).fill(0); //1 yellow 2 green
        let set = Array(30).fill(0);
        for (let i = 0; i < 5; i++)
        {
            let ascii = solution[i].charCodeAt(0) - 97;
            if (ascii < 0)
                ascii += 32
            set[ascii]++;
        }
        for (let i = 0; i < 5; i++)
        {
            if (curGuess[i] === solution[i])
            {
                colors[i] = 2;
                let ascii = solution[i].charCodeAt(0) - 97;
                if (ascii < 0)
                    ascii += 32
                set[ascii]--;
            }
        }
        for (let i = 0; i < 5; i++)
        {
            if (colors[i] === 2)
                continue;
            let ascii = curGuess[i].charCodeAt(0) - 97;
            if (ascii < 0)
                ascii += 32
            for (let j = 0; j < 5; j++)
            {

                if (curGuess[i] === solution[j] && set[ascii] > 0)
                {
                    colors[i] = 1;
                    set[ascii]--;
                    break
                }
            }
        }
        let newGuesses = JSON.parse(JSON.stringify(guesses));
        newGuesses[turn] = [
            {char: curGuess[0], color: retColor(colors[0])},
            {char: curGuess[1], color: retColor(colors[1])},
            {char: curGuess[2], color: retColor(colors[2])},
            {char: curGuess[3], color: retColor(colors[3])},
            {char: curGuess[4], color: retColor(colors[4])}
        ]
        console.log(newGuesses)

        setGuesses(newGuesses)
        // add the formatted guess generated into guesses.

        // turn += 1

        setTurn(turn + 1)
        // set curGuess to default


        // TODO 5: update parameters, check each char usage and show in `Keyboard` and reset `curGuess`.
        // 5-1) check if curGuess === solution, if true, set `isCorrect` to true.


        // 5-2) usedChars update
        // let clr = Array(26).fill(0)
        let newUsedChars = JSON.parse(JSON.stringify(usedChars));

        for (let i = 0; i < 5; i++)
        {
            let ascii = curGuess[i].charCodeAt(0) - 97;
            if (ascii < 0)
                ascii += 32
            // console.log("now = ", ascii)
            if (newUsedChars[ascii] === 2)
            {
                // console.log("type1")
                continue;
            }
            else if (newUsedChars[ascii] === 1 && colors[i] === 2)
            {
                newUsedChars[ascii] = 2;
                // console.log("type2")
            }
            else if (newUsedChars[ascii] === 0)
            {
// console.log("type3", )
                newUsedChars[ascii] = colors[i];
            }
        }
        // setUsedChars(clr)
        setUsedChars(newUsedChars)
        console.log(newUsedChars)
        if (curGuess === solution)
        {
            setIsCorrect(true)

        }


        setCurGuess("")



    }

    // Handle the action of `Backspace`
    const handleBackspace = () =>
    {
        setCurGuess(curGuess.substring(0, curGuess.length - 1));
    }

    // Handle the action of pressing a character.
    const handleCharacter = (key) =>
    {
        // If curGuess's length is longer than 5, do nothing
        if (curGuess.length < 5)
        {
            setCurGuess(curGuess + key);
        }
    }
    const handleKeyup = ({key}) =>
    {
        // console.log("You just press: ", key);
        if (key === 'Enter') handleEnter();
        else if (key === 'Backspace') handleBackspace();
        else if (/^[A-Za-z]$/.test(key)) handleCharacter(key);
    }
    return {turn, curGuess, guesses, isCorrect, usedChars, handleKeyup, printTest};
}

export default useWordle;
