import React, {useState} from 'react';
import './App.css';
import {guess, startGame, restart} from './axios'

function App() {
    const [hasStarted, setHasStarted] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [number, setNumber] = useState('')
    const [status, setStatus] = useState('')

    const handleStartGame = async () => {
        const response = await startGame()
        if (response.msg === 'The game has started.') {
            setHasStarted(true)
            console.log("ans = ", response.ans)
        }
    }

    const handleGuess = async () => {
        const response = await guess(number)
        if (response === 'Equal')
            setHasWon(true)
        else {
            setStatus(response)
            setNumber('')
        }
    }

    const handleRestart = async () => {
        setHasWon(false)
        setStatus('')
        setNumber('')
        const response = await restart()
        if (response.msg === 'The game has restarted.') {
            setHasStarted(true)
            console.log("ans = ", response.ans)
        }
    }

    const startMenu = (
        <div>
            <button onClick={handleStartGame}>
                start game
            </button>
        </div>
    )

    const gameMode = (
        <div>
            <p>Guess a number between 1 to 100</p>
            <input value={number} onChange={e => setNumber(e.target.value)}></input>
            <button onClick={handleGuess} disabled={!number}>
                guess!
            </button>
            <p>{status}</p>
        </div>
    )

    const winningMode = (
        <div>
            <p>you won! the number was {number}.</p>
            <button onClick={handleRestart}>
                restart
            </button>
        </div>
    )

    const game = (
        <div>
            {hasWon ? winningMode : gameMode}
        </div>
    )

    return (
        <div className="App">
            {hasStarted ? game : startMenu}
        </div>
    );
}

export default App;
