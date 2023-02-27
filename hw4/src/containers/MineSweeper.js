/****************************************************************************
 FileName      [ MineSweeper.js ]
 PackageName   [ src/containers ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ The control and main page of MineSweeper. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import './MineSweeper.css';
import Board from '../components/Board'
import React, {useState} from 'react';
import HomePage from '../components/HomePage'

const MineSweeper = () =>
{
    const [startGame, setStartGame] = useState(false);      // A boolean variable. If true, show `Board`, else show `HomePage`.
    const [mineNum, setMineNum] = useState(10);             // An integer variable to store the number of mines in the game. The default value is 10.
    const [boardSize, setBoardSize] = useState(8);          // An integer variable to store the board size in the game. The default value is 8.

    const startGameOnClick = () =>
    {
        setStartGame(true);
    }

    const mineNumOnChange = (value) =>
    {
        setMineNum(value);
    }

    const boardSizeOnChange = (value) =>
    {
        setBoardSize(value);
    }

    const backToHomeOnClick = () =>
    {
        setStartGame(false);
    }

    return (
        <div className='mineSweeper'>
            {startGame ?
                <Board
                    boardSize={boardSize}
                    mineNum={mineNum}
                    backToHome={backToHomeOnClick}
                /> :
                <HomePage
                    startGameOnClick={startGameOnClick}
                    mineNumOnChange={mineNumOnChange}
                    boardSizeOnChange={boardSizeOnChange}
                    mineNum={mineNum}
                    boardSize={boardSize}
                />
            }
        </div>
    );
}
export default MineSweeper;