const Subscription = {
    message: {
        subscribe: (parent, {chatBoxName}, { pubsub }) => {
            // const chatBoxName = makeName(from, to);
            console.log("subscribe chatBoxName:", chatBoxName)
            // return pubsub.subscribe('post');
                return pubsub.subscribe(chatBoxName);
        }, },
};

export default Subscription