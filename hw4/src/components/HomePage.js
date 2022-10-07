/****************************************************************************
 FileName      [ HomePage.js ]
 PackageName   [ src/components ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file generates the Home page.  ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import './css/HomePage.css';
import React, {useEffect, useState} from 'react';

const HomePage = ({
                      startGameOnClick,
                      mineNumOnChange,
                      boardSizeOnChange,
                      mineNum,
                      boardSize
                  }) =>
{
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    useEffect(() =>
    {
        if (mineNum > boardSize * boardSize)
            setError(true)
        else
            setError(false)
    }, [mineNum, boardSize]);

    return (
        <div className='HomeWrapper'>
            <p className='title'>MineSweeper</p>
            <button
                className="btn"
                onClick={startGameOnClick}
            >
                Start Game
            </button>

            <div className="controlContainer">
                <button
                    className="btn"
                    onClick={() => setShowPanel(!showPanel)}
                >
                    Difficulty Adjustment
                </button>

                {showPanel && <div className="controlWrapper">
                    <div
                        className="error"
                        style={{color: error ? "#880000" : "transparent"}}
                    >
                        ERROR: Mines number and board size are invalid!
                    </div>
                    <div className="controlPanel">
                        <div className="controlCol">
                            <p className="controlTitle">Mines Number</p>
                            <input
                                type="range"
                                step="1"
                                min="1"
                                max="100"
                                defaultValue={mineNum}
                                onChange={e => mineNumOnChange(e.target.value)}
                            />
                            <p
                                className="controlNum"
                                style={{color: error ? "#880000" : "#0f0f4b"}}
                            >
                                {mineNum}
                            </p>
                        </div>
                        <div className="controlCol">
                            <p className="controlTitle">Board Size (n×n)</p>
                            <input
                                type="range"
                                step="1"
                                min="1"
                                max="10"
                                defaultValue={boardSize}
                                onChange={e => boardSizeOnChange(e.target.value)}
                            />
                            <p
                                className="controlNum"
                                style={{color: error ? "#880000" : "#0f0f4b"}}
                            >
                                {boardSize}
                            </p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}
export default HomePage;