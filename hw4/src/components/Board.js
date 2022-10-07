/****************************************************************************
 FileName      [ Board.js ]
 PackageName   [ src/components ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file generates the Board. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import {revealed} from '../util/reveal';
import createBoard from '../util/createBoard';
import React, {useEffect, useState} from 'react';


const Board = ({boardSize, mineNum, backToHome}) =>
{
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(boardSize * boardSize);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() =>
    {
        freshBoard();
    }, []);

    useEffect(() =>
    {
        if (nonMineCount === 0)
        {
            setWin(true)
            setGameOver(true)
        }
    }, [nonMineCount]);

    // Creating a board
    const freshBoard = () =>
    {
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard.board)
        setNonMineCount(boardSize * boardSize)
        setMineLocations(newBoard.mineLocations)
        setRemainFlagNum(mineNum)
    }

    const restartGame = () =>
    {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) =>
    {
        e.preventDefault();
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        if (board[x][y].revealed || (!newBoard[x][y].flagged && !remainFlagNum))
            return

        if (newBoard[x][y].flagged)
        {
            setRemainFlagNum(newFlagNum + 1)
            setNonMineCount(nonMineCount + 1)
        }
        else
        {
            setRemainFlagNum(newFlagNum - 1)
            setNonMineCount(nonMineCount - 1)
        }
        newBoard[x][y].flagged = !newBoard[x][y].flagged
        setBoard(newBoard)
    };

    const revealCell = (x, y) =>
    {
        if (board[x][y].revealed || gameOver || board[x][y].flagged)
            return;

        let newBoard = JSON.parse(JSON.stringify(board));
        let newRevealed = revealed(newBoard, x, y, nonMineCount, boardSize)
        setBoard(newRevealed.board)
        if (board[x][y].value === '💣')
        {
            for (let i = 0; i < mineLocations.length; i++)
            {
                if (!newRevealed.board[mineLocations[i][0]][mineLocations[i][1]].flagged)
                    newRevealed.board[mineLocations[i][0]][mineLocations[i][1]].revealed = true
            }
            setBoard(newRevealed.board)
            setGameOver(true)
            return;
        }
        setNonMineCount(newRevealed.newNonMinesCount)
    };

    return (
        <div className='boardPage'>
            <div className='boardWrapper'>
                {gameOver &&
                    <Modal
                        restartGame={restartGame}
                        backToHome={backToHome}
                        win={win}
                    />}
                <div className="boardContainer">
                    <Dashboard
                        remainFlagNum={remainFlagNum}
                        gameOver={gameOver}
                    />
                    <div>
                        {board.map((row, x) => (
                            <div
                                id={"row" + x}
                                style={{display: "flex"}}
                                key={"row" + x}
                            >
                                {row.map((col, y) => (
                                    <Cell
                                        key={x.toString() + "-" + y.toString()}
                                        rowIdx={x}
                                        colIdx={y}
                                        detail={board[x][y]}
                                        updateFlag={updateFlag}
                                        revealCell={revealCell}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board