import mongoose from 'mongoose';

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    body: {type: String, required: [true, 'Body field is required.']},
    sender: {type: String, required: [true, 'Sender field is required.']},
}, {timestamps: true});

const ChatBoxSchema = new Schema({
    name: {type: String, required: [true, 'Name field is required.']},
    messages: [{type: mongoose.Types.ObjectId, ref: 'Message'}]
});

const MessageModel = mongoose.model('Message', MessageSchema);
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

export {MessageModel, ChatBoxModel}