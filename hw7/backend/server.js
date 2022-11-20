// import http, express, dotenv-defaults, mongoose, WebSocket
import http from 'http'
import express from 'express'
import mongoose from 'mongoose';
import mongo from './mongo'
import WebSocket from "ws";
import wsConnect from './wsConnect'

mongo.connect();

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})
mongoose.connection.once('open', () => {
    console.log("MongoDB connected!");

    wss.on('connection', (ws) => {
        ws.onmessage = wsConnect.onMessage(wss, ws);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
    console.log(`HW7 listening on port ${PORT}!`),
);
