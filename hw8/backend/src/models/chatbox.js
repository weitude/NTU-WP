import mongoose from 'mongoose';

const Schema = mongoose.Schema
/*
const MessageSchema = new Schema({
    sender: {type: String, required: [true, 'Sender field is required.']},
    body: {type: String, required: [true, 'Body field is required.']},
}, {timestamps: true});*/

const ChatBoxSchema = new Schema({
    name: {type: String},
    // name: {type: String, required: [true, 'Name field is required.']},
    messages: [{
        body: {type: String, required: [true, 'Body field is required.']},
        sender: {type: String, required: [true, 'Sender field is required.']},
    }
    ]
});

// const MessageModel = mongoose.model('Message', MessageSchema);
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

export default ChatBoxModel