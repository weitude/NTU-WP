const makeName = (from, to) => {
    return [from, to].sort().join('_');
};

const checkOutChatBox = async (chatBoxName, ChatBoxModel) => {
    let box = await ChatBoxModel.findOne({name: chatBoxName});
    if (!box) {
        box = await ChatBoxModel.create({name: chatBoxName});
    }
    return box;
}

const Mutation = {
    createMessage: async (parent, {from, to, body}, {ChatBoxModel, pubsub}) => {
        const chatBoxName = makeName(from, to);
        const chatBox = await checkOutChatBox(chatBoxName, ChatBoxModel);
        const newMsg = {sender: from, body: body};
        chatBox.messages.push(newMsg);
        await chatBox.save();
        pubsub.publish(chatBoxName, {
            message: newMsg,
        });
        return newMsg;
    },
};

export default Mutation