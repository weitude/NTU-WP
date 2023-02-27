import {Input, Tabs} from 'antd'
import styled from 'styled-components';
import React, {useEffect, useRef, useState} from "react";
import {useChat} from "../hooks/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";
import {CHATBOX_QUERY, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION} from "../graphql";
import {useLazyQuery, useMutation} from "@apollo/client";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 400px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px 10px 20px 20px;

  .ant-tabs-nav-wrap {
    height: 40px;
  }
`;

const MessagesWrapper = styled.div`
  height: 310px;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 10px;
`;

const makeName = (from, to) => {
    return [from, to].sort().join('_');
};

const ChatRoom = () => {
    const {
        me,
        displayStatus,
    } = useChat()

    const [body, setBody] = useState("");
    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState("")
    const [modalOpen, setModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatBoxName, setChatBoxName] = useState("")
    const msgFooter = useRef(null)

    const [getMessages, {loading, error, data, subscribeToMore}] = useLazyQuery(CHATBOX_QUERY, {
        onCompleted: someData => {
            setMessages(someData.chatbox.messages)
        }
    });

    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
        ignoreResults: true,
    });

    useEffect(() => {
        if (chatBoxName) {
            const unsubscribe = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {chatBoxName: chatBoxName},
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    displayStatus({type: "success", msg: "Message sent."})
                    return {
                        // ...prev,
                        chatbox: {
                            name: chatBoxName,
                            messages: [...prev.chatbox.messages, newMessage],
                            __typename: "ChatBox"
                        },
                    };
                },
            });
            return () => unsubscribe();
        }
    }, [subscribeToMore, activeKey]);

    useEffect(() => {
        if (chatBoxName) {
            getMessages({variables: {chatBoxName: chatBoxName}}).then(() => console.log("success getMessages", chatBoxName))
        }
    }, [chatBoxName]);

    useEffect(() => {
        scrollToBottom()
    }, [chatBoxes])

    useEffect(() => {
        const newChatBoxes = chatBoxes.map(obj => {
            if (obj.label === activeKey) {
                return {...obj, children: renderChat(messages)};
            }
            return obj;
        });
        setChatBoxes(newChatBoxes)
    }, [messages])

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({behavior: 'smooth', block: "end"});
    };

    const renderChat = (chat) => {
        return (
            <MessagesWrapper>
                {chat.length === 0
                    ? (<p style={{color: '#ccc'}}> No messages... </p>)
                    : (chat.map(({body, sender}, i) => (
                        <Message key={i} isMe={me === sender} body={body}/>)))}
                <FootRef ref={(el) => msgFooter.current = el}/>
            </MessagesWrapper>
        )
    };

    const createChatBox = (friend) => {
        const chat = renderChat(messages);
        setChatBoxes([...chatBoxes, {
            label: friend,
            children: chat,
            key: friend
        }]);
        return friend;
    }

    const removeChatBox = async (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        const len = newChatBoxes.length
        let ret
        if (index === len)
            ret = newChatBoxes[index - 1].key
        else if (targetKey === activeKey)
            ret = newChatBoxes[index].key
        else
            ret = activeKey

        setChatBoxName(makeName(me, ret))
        setActiveKey(ret);
        setChatBoxes(newChatBoxes);
    };


    return (
        <>
            <Title name={me}/>
            <ChatBoxesWrapper
                type="editable-card"
                onChange={async (key) => {
                    setChatBoxName(makeName(me, key))
                    setActiveKey(key);
                }}
                activeKey={activeKey}
                onEdit={async (targetKey, action) => {
                    if (action === 'add')
                        setModalOpen(true);
                    else if (action === 'remove') {
                        await removeChatBox(targetKey, activeKey)
                        displayStatus({type: "success", msg: "Remove chatbox \"" + makeName(me, targetKey)+"\""})
                    }
                }}
                items={chatBoxes}
            />

            <ChatModal
                open={modalOpen}
                onCreate={async ({name}) => {
                    if (chatBoxes.some(({key}) => key === name)) {
                        window.alert("chatbox exist!");
                    }
                    else {
                        setChatBoxName(makeName(me, name))
                        createChatBox(name)
                        setActiveKey(name);
                        setModalOpen(false);
                        displayStatus({type: "success", msg: "Open chatbox \"" + makeName(me, name)+"\""})
                    }
                }}
                onCancel={() => {
                    setModalOpen(false);
                }}
            />

            <Input.Search
                disabled={!activeKey}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={async (msg) => {
                    if (!msg) {
                        displayStatus({type: "error", msg: "Please enter a message!"})
                        return
                    }
                    await sendMessage({variables: {from: me, to: activeKey, body: msg}});
                    setBody("")
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom