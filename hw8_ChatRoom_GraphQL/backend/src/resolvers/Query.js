const Query = {
    chatbox: async (parent, {chatBoxName}, {ChatBoxModel}) => {
        let box = await ChatBoxModel.findOne({name:chatBoxName});
        if (!box) {
            box = await ChatBoxModel.create({name: chatBoxName});
        }
        if (box.__v > 50)
            box.messages.splice(0, box.__v - 50)
        return box;
    },
};
export default Query;