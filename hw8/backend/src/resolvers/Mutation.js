const makeName = (from, to) => {
    return [from, to].sort().join('_');
};

const checkOutChatBox = async (chatBoxName, ChatBoxModel) => {
    let box = await ChatBoxModel.findOne({name: chatBoxName});
    if (!box) {
        box = await ChatBoxModel.create({name: chatBoxName});
    }
    // console.log("box:",box)
    return box;
}


const Mutation = {
    createChatBox:async (parent, {from, to}, {ChatBoxModel}) => {
        const chatBoxName = makeName(from, to);
        const ret = await checkOutChatBox(chatBoxName, ChatBoxModel)
        console.log("createChatBox:", ret.__v)
        return ret;
    },
    createMessage: async (parent, {from, to, body}, {ChatBoxModel, pubsub}) => {
        const chatBoxName = makeName(from, to);
        // console.log("chatBoxName =",chatBoxName )
        const chatBox = await checkOutChatBox(chatBoxName, ChatBoxModel);
        const newMsg = {sender: from, body: body};
        chatBox.messages.push(newMsg);
        await chatBox.save();
        console.log("from:", from, "to:", to, "body:", body, chatBox.__v)
        // console.log("test:",`${chatBoxName}`)
        pubsub.publish(chatBoxName, {
            message: newMsg,
        });
        /*pubsub.publish('post', {
            message: newMsg,
        });*/
        return newMsg;
    },
};

export default Mutation