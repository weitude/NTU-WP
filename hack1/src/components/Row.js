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
    if (guess)
    {
        return (
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
            </div>
        )
    }
    else
        return (
            <div className='Row-wrapper'>
                <div id={rowIdx + "-0"} key={rowIdx + "-0"} className={"Row-wordbox"}></div>
                <div id={rowIdx + "-1"} key={rowIdx + "-1"} className={"Row-wordbox"}></div>
                <div id={rowIdx + "-2"} key={rowIdx + "-2"} className={"Row-wordbox"}></div>
                <div id={rowIdx + "-3"} key={rowIdx + "-3"} className={"Row-wordbox"}></div>
                <div id={rowIdx + "-4"} key={rowIdx + "-4"} className={"Row-wordbox"}></div>
            </div>
        )
}

export default Row;