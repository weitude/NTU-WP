/****************************************************************************
 FileName      [ Keyboard.js ]
 PackageName   [ src/components ]
 Author        [ Cheng-Hua Lu ]
 Synopsis      [ This file generates the Keyboard. ]
 Copyright     [ 2022 10 ]
 ****************************************************************************/

import './css/Keyboard.css';
import config from '../data/config.json';
import React, {useEffect, useState} from 'react';
import {IoBackspaceOutline} from 'react-icons/io5';

const Keyboard = ({usedChars}) =>
{
    const [firstRowLetters, setFirstRowLetters] = useState(null);       // firstRowLetters must be a 10-character array.
    const [secondRowLetters, setSecondRowLetters] = useState(null);     // secondRowLetters must be a 9-character array.
    const [thirdRowLetters, setThirdRowLetters] = useState(null);

    useEffect(() =>
    {
        // TODO 1-2: slice `config.letters` into three parts.
        setFirstRowLetters(config.letters.slice(0, 10));
        setSecondRowLetters(config.letters.slice(10, 19));
        setThirdRowLetters(config.letters.slice(19, 29));
    }, [])

    const retColor = (type) =>
    {
        if (type === 0)
            return "grey"
        else if (type === 1)
            return "yellow"
        else if (type === 2)
            return "green"
    }

    const tra = (ch) =>
    {
        let ascii = ch.charCodeAt(0) - 97;
        if (ascii < 0)
            ascii += 32
        return retColor(usedChars[ascii])
    }

    return (
        <div className='Keyboard-container'>
            <div id='KBrow_1' key='KBrow_1' className='Keyboard-row'>
                {firstRowLetters && firstRowLetters.map((letter) =>
                {
                    return (
                        letter.char === 'Enter' ?
                            <div key={'char_' + letter.char} className='Keyboard-char-enter'>{letter.char}</div>
                            :
                            letter.char === 'Backspace' ?
                                <div key={'char_' + letter.char} className='Keyboard-char-backspace'>
                                    <IoBackspaceOutline/></div>
                                :
                                <div id={'char_' + letter.char} key={'char_' + letter.char}
                                     className={'Keyboard-char ' + tra(letter.char)}>{letter.char}</div>
                    )
                })}
            </div>
            <div id='KBrow_2' key='KBrow_2' className='Keyboard-row'>
                {secondRowLetters && secondRowLetters.map((letter) =>
                {
                    return (
                        letter.char === 'Enter' ?
                            <div key={'char_' + letter.char} className='Keyboard-char-enter'>{letter.char}</div>
                            :
                            letter.char === 'Backspace' ?
                                <div key={'char_' + letter.char} className='Keyboard-char-backspace'>
                                    <IoBackspaceOutline/></div>
                                :
                                <div id={'char_' + letter.char} key={'char_' + letter.char}
                                     className={'Keyboard-char ' + tra(letter.char)}>{letter.char}</div>
                    )
                })}
            </div>
            <div id='KBrow_3' key='KBrow_3' className='Keyboard-row'>
                {thirdRowLetters && thirdRowLetters.map((letter) =>
                {
                    return (
                        letter.char === 'Enter' ?
                            <div key={'char_' + letter.char} className='Keyboard-char-enter'>{letter.char}</div>
                            :
                            letter.char === 'Backspace' ?
                                <div key={'char_' + letter.char} className='Keyboard-char-backspace'>
                                    <IoBackspaceOutline/></div>
                                :
                                <div id={'char_' + letter.char} key={'char_' + letter.char}
                                     className={'Keyboard-char ' + tra(letter.char)}>{letter.char}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Keyboard;