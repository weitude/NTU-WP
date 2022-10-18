/****************************************************************************
 FileName      [ Row.js ]
 PackageName   [ src/components ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file generates the Row. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({guess, rowIdx}) =>
{
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}

            {/* ↓ Default row, you should modify it. ↓ */}
            {guess ?

                <div className='Row-wrapper'>
                    {guess.map((row, x) => (
                        <div
                            id={rowIdx + "-" + x}
                            key={rowIdx + "-" + x}
                            className={"Row-wordbox " + row.color}
                        >
                            {row.char}
                        </div>
                    ))}

                </div> :
                <div className='Row-wrapper'>

                    <div id={rowIdx + "-0"} key={rowIdx + "-0"} className={"Row-wordbox"}></div>
                    <div id={rowIdx + "-1"} key={rowIdx + "-1"} className={"Row-wordbox"}></div>
                    <div id={rowIdx + "-2"} key={rowIdx + "-2"} className={"Row-wordbox"}></div>
                    <div id={rowIdx + "-3"} key={rowIdx + "-3"} className={"Row-wordbox"}></div>
                    <div id={rowIdx + "-4"} key={rowIdx + "-4"} className={"Row-wordbox"}></div>
                </div>

            }
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;