import {Router} from "express";

import ScoreCard from "../models/ScoreCard";

const router = Router();

//CLEAR
router.delete("/cards", async (_, res) => {
    try {
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
        res.json({message: "Database cleared"})
    } catch (e) {
        throw new Error("CLEAR error: " + e);
    }
});

//ADD
router.post("/card", async (req, res) => {
    const name = req.body.name
    const subject = req.body.subject
    const score = req.body.score
    const existing = await ScoreCard.findOne({name: name, subject: subject});

    try {
        if (existing) {
            await ScoreCard.updateOne({name: name, subject: subject}, {score: score});
            console.log("Updated ScoreCard");
            res.json({message: 'Updating (' + name + ', ' + subject + ', ' + score + ')', card: true})
        }
        else {
            await ScoreCard.create({name: name, subject: subject, score: score})
            console.log("Created ScoreCard");
            res.json({message: 'Adding (' + name + ', ' + subject + ', ' + score + ')', card: true})
        }
    } catch (e) {
        throw new Error("ADD error: " + e);
    }
});

//QUERY
router.get("/cards", async (req, res) => {
    const queryType = req.query.type
    const queryString = req.query.queryString
    let messages = []

    try {
        if (queryType === "name") {
            const q = await ScoreCard.find({name: queryString})
            const len = q.length
            if (len === 0) {
                res.json({messages: false, message: queryType + ' (' + queryString + ') not found!'})
            }
            else {
                for (let i = 0; i < len; i++)
                    messages.push("Found card with name: (" + q[i].name + ', ' + q[i].subject + ', ' + q[i].score + ')')
                res.json({messages: messages, message: ''})
            }
        }
        else if (queryType === "subject") {
            const q = await ScoreCard.find({subject: queryString})
            const len = q.length
            if (len === 0) {
                res.json({messages: false, message: queryType + ' (' + queryString + ') not found!'})
            }
            else {
                for (let i = 0; i < len; i++)
                    messages.push("Found card with subject: (" + q[i].name + ', ' + q[i].subject + ', ' + q[i].score + ')')
                res.json({messages: messages, message: ''})
            }
        }
    } catch (e) {
        throw new Error("QUERY error: " + e);
    }
});

export default router;
