const Query = {
    chatbox: async (parent, {chatBoxName}, {ChatBoxModel}) => {
        // if (!chatBoxName)
        //     return ;
        // console.log("chatBoxName: |", chatBoxName, '|')
        let box = await ChatBoxModel.findOne({name:chatBoxName});
        if (!box) {
            box = await ChatBoxModel.create({name: chatBoxName});
        }
        console.log("Query:",box.name, box.__v)
        return box;
    },
};
export default Query;