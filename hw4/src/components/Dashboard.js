/****************************************************************************
 FileName      [ Dashnoard.js ]
 PackageName   [ src/components ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file generates the Dashboard. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import React, {useEffect, useState} from 'react';
import "./css/Dashboard.css"

export default function Dashboard({remainFlagNum, gameOver})
{
    let [time, setTime] = useState(0);
    let [sTime, setSTime] = useState(0);

    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            setTime((time) => time + 1)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() =>
    {
        setSTime(time)
        setTime(0)
    }, [gameOver]);

    return (
        <div className="dashBoard">
            <div id='dashBoard_col1'>
                <div className='dashBoard_col'>
                    <p className='icon'>🚩</p>
                    {remainFlagNum}
                </div>
            </div>
            <div id='dashBoard_col2'>
                <div className='dashBoard_col'>
                    <p className='icon'>⏰</p>
                    {gameOver ? sTime : time}
                </div>
            </div>
        </div>
    );
}
