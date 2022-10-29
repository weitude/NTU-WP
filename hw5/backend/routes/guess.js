import express from 'express'
import {getNumber, genNumber} from "../core/getNumber";

const router = express.Router()
router.post('/start', (_, res) =>
{
    genNumber()
    res.json({msg: 'The game has started.', ans: getNumber()})
})
router.get('/guess', (req, res) =>
{
    const myGuess = req.query.number
    const myGuessToNum = Number(myGuess)
    if (isNaN(myGuessToNum))
    {
        res.status(406).send({msg: 'Not a legal number.'})
    }
    else if (myGuessToNum < 1 || myGuessToNum > 100)
    {
        res.status(406).send({msg: 'Not a legal number.'})
    }
    else
    {
        const ans = getNumber()
        if (ans > myGuessToNum)
            res.json({msg: 'Bigger'})
        else if (ans < myGuessToNum)
            res.json({msg: 'Smaller'})
        else if (ans === myGuessToNum)
            res.json({msg: 'Equal'})
    }
})
router.post('/restart', (_, res) =>
{
    genNumber()
    res.json({msg: 'The game has restarted.', ans: getNumber()})
})
export default router;