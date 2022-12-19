const Query = {
    chatbox: async (parent, {chatBoxName}, {ChatBoxModel}) => {
        // if (!chatBoxName)
        //     return ;
        // console.log("chatBoxName: |", chatBoxName, '|')
        let box = await ChatBoxModel.findOne({name:chatBoxName});
        if (!box) {
            box = await ChatBoxModel.create({name: chatBoxName});
        }
        return box;
    },
};
export default Query;