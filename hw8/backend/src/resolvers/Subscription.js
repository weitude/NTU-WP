const Subscription = {
    message: {
        subscribe: (parent, {chatBoxName}, {pubsub}) => {
            return pubsub.subscribe(chatBoxName);
        },
    },
};

export default Subscription