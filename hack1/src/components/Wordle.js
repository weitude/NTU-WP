/****************************************************************************
 FileName      [ Wordle.js ]
 PackageName   [ src/components ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file generates the Wordle. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import './css/Wordle.css';
import Board from './Board';
import Keyboard from './Keyboard';
import useWordle from './hooks/useWordle';
import React, {useEffect, useState} from 'react';


const Wordle = ({solution}) =>
{
    const {turn, curGuess, guesses, isCorrect, usedChars, handleKeyup} = useWordle(solution);
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);                      // A bool whose default is false. It will be set to turn when the game is ended.
    const [win, setWin] = useState(false);                                // A bool whose default is false. It will be set to turn when the player wins the game.


    useEffect(() =>
    {
        window.addEventListener('keyup', handleKeyup);
        if (isCorrect)
        {
            setTimeout(() =>
            {
                setGameOver(true)
                setWin(true)
                setResult("You win!!!!")
            })
        }
        else if (turn > 5)
        {
            setTimeout(() =>
            {
                setGameOver(true)
                setResult("You lose!!!! The answer is " + solution + ".")
            })
        }
        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup])


    const state = () =>
    {
        if (win)
            return "Wordle-win"
        else if (gameOver)
            return "Wordle-lose"
        else
            return "Wordle-lose Hidden"
    }

    return (
        <div className='Wordle-container'>
            <div className={state()}>
                {result}
            </div>
            <Board
                turn={turn}
                guesses={guesses}
                curGuess={curGuess}
            />
            <Keyboard usedChars={usedChars}/>
        </div>
    )
}

export default Wordle;