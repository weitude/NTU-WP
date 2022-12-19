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
    createChatBox: (parent, {from, to}, {ChatBoxModel}) => {
        const chatBoxName = makeName(from, to);
        return checkOutChatBox(chatBoxName, ChatBoxModel);
    },
    createMessage: async (parent, {from, to, body}, {ChatBoxModel, pubsub}) => {
        const chatBoxName = makeName(from, to);
        // console.log("chatBoxName =",chatBoxName )
        const chatBox = await checkOutChatBox(chatBoxName, ChatBoxModel);
        const newMsg = {sender: from, body: body};
        chatBox.messages.push(newMsg);
        await chatBox.save();
        console.log("test:",`${chatBoxName}`)
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