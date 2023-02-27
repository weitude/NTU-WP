import mongoose from 'mongoose';

const Schema = mongoose.Schema

const ChatBoxSchema = new Schema({
    name: {type: String},
    messages: [{
        body: {type: String, required: [true, 'Body field is required.']},
        sender: {type: String, required: [true, 'Sender field is required.']},
    }
    ]
});

const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

export default ChatBoxModel