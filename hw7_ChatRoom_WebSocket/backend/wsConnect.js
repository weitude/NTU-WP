import {MessageModel, ChatBoxModel} from "./models/chatbox";

let chatBoxWs = [];

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const makeName = (from, to) => {
    return [from, to].sort().join('_');
};

export default {

    onMessage: (wss, ws) => (
        async (byteString) => {
            const {data} = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case "input": {
                    const {from, to, body} = payload
                    const chatBoxName = makeName(from, to)
                    const message = await MessageModel.create({body: body, sender: from})
                    await ChatBoxModel.updateOne({name: chatBoxName}, {$push: {messages: message}})

                    const len = chatBoxWs.length
                    for (let i = 0; i < len; i++) {
                        if (chatBoxWs[i].name === chatBoxName) {
                            sendData(["output", message], chatBoxWs[i].net)
                            sendData(["status", {type: "success", msg: "Message sent."}], chatBoxWs[i].net)
                        }
                    }
                    break
                }

                case "start": {
                    const {from, to} = payload
                    const chatBoxName = makeName(from, to)
                    let len = chatBoxWs.length, flag = 1
                    for (let i = 0; i < len; i++) {
                        if (chatBoxWs[i].net === ws) {
                            flag = 0
                            chatBoxWs[i].name = chatBoxName
                            break
                        }
                    }
                    if (flag) {
                        chatBoxWs.push({name: chatBoxName, net: ws})
                        len = chatBoxWs.length
                    }

                    // handle disconnect
                    let idx, wss_size = wss.clients.size;
                    while (len > wss_size) {
                        for (idx = 0; idx < len; idx++) {
                            if (!wss.clients.has(chatBoxWs[idx].net))
                                break;
                        }
                        chatBoxWs.splice(idx, 1);
                        len = chatBoxWs.length;
                        wss_size = wss.clients.size;
                    }

                    if (!await ChatBoxModel.findOne({name: chatBoxName})) {
                        await ChatBoxModel.create({name: chatBoxName})
                    }
                    const {messages} = await ChatBoxModel.findOne({name: chatBoxName}).populate({
                        path: "messages", options: {sort: {"createdAt": -1}, limit: 30}
                    })
                    messages.reverse()
                    sendData(["start", messages], ws)
                    sendData(["status", {type: "success", msg: "Open tab."}], ws)
                    break
                }
                default:
                    break
            }
        })
}

