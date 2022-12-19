import {Input, Tabs} from 'antd'
import styled from 'styled-components';
import React, {useEffect, useRef, useState} from "react";
import {useChat} from "../hooks/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";
import {CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION} from "../graphql";
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
        status,
        me,
        displayStatus,
    } = useChat()

    const [body, setBody] = useState("");
    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState("")
    const [modalOpen, setModalOpen] = useState(false);
    // const [messages, setMessages] = useState([]);
    const [chatBoxName, setChatBoxName] = useState("")
    const chatBoxNameRef = useRef(null);
    const msgFooter = useRef(null)

    // console.log("chatBoxNameRef", chatBoxNameRef)
    const [getMessages, {loading, error, data, subscribeToMore}] = useLazyQuery(CHATBOX_QUERY);


    // const {data, loading, subscribeToMore}
    //     = useQuery(CHATBOX_QUERY, {variables: {chatBoxName: chatBoxName}});
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    /*useEffect(() => {
        if (!loading && data)
            setMessages(data.chatbox.messages)
    }, [data]);*/

    useEffect(() => {
        chatBoxNameRef.current = chatBoxName
        console.log("chatBoxNameRef.current 2 =", chatBoxNameRef.current)
        getMessages({variables: {chatBoxName: chatBoxNameRef.current}}).then(() => console.log("success getMessages",chatBoxNameRef.current ))

    }, [chatBoxName]);

    useEffect(() => {
        displayStatus(status)
    }, [status])

    useEffect(() => {
        scrollToBottom()
    }, [chatBoxes])

    useEffect(() => {
        console.log("useEffect data start!")
        if (!loading && data)
        {
            const newChatBoxes = chatBoxes.map(obj => {
                if (obj.label === activeKey) {
                    return {...obj, children: renderChat(data.chatbox.messages)};
                }
                return obj;
            });
            setChatBoxes(newChatBoxes)
        }
        console.log("useEffect data end!")

    }, [data])

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({behavior: 'smooth', block: "end"});
    };

    const renderChat = (chat) => {
        console.log("chat =", chat)
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
        console.log("friend:", friend)
        console.log("messages =", data.chatbox.messages)
        const chat = renderChat(data.chatbox.messages);
        setChatBoxes([...chatBoxes, {
            label: friend,
            children: chat,
            key: friend
        }]);
        return friend;
    }

    const openModal = async(name)=>{
        console.log("name =", name)
        setChatBoxName(makeName(me, name))
        console.log("chatBoxNameRef.current 1 =", chatBoxNameRef.current)
        // await getMessages({variables: {chatBoxName: chatBoxName}})

        const ret = await startChat({variables: {from: me, to: name}});
        console.log("dbg1", ret)
        // startChat(me, name);
        createChatBox(name)
        // handleSubmit()
        setActiveKey(name);

        setModalOpen(false);
    }

    const removeChatBox =async (targetKey, activeKey) => {
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
        console.log("ret:", ret)
        setActiveKey(ret);
        console.log("after remove, chatBoxName:", chatBoxName)
        await startChat({variables: {from: me, to: ret}});

        setChatBoxes(newChatBoxes);
        return ret

    };

    useEffect(() => {
        if (chatBoxNameRef.current) {
            const unsubscribe = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {chatBoxName: chatBoxNameRef.current},
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    console.log("subscribeToMore")
                    return {
                        ...prev,
                        chatbox: {
                            name: prev.chatbox.name,
                            messages: [...prev.chatbox.messages, newMessage],
                            __typename: "ChatBox"
                        },
                    };
                },
            });
            return () => unsubscribe();
        }

    }, [subscribeToMore, activeKey]);

    const handleSubmit = () => {
        if (chatBoxNameRef.current) {
            try {
                const unsubscribe = subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: {chatBoxName: chatBoxNameRef.current},
                    updateQuery: (prev, {subscriptionData}) => {
                        if (!subscriptionData.data) return prev;
                        const newMessage = subscriptionData.data.message;
                        return {
                            chatbox: {
                                name: prev.chatbox.name,
                                messages: [...prev.chatbox.messages, newMessage],
                                __typename: "ChatBox"
                            },
                        };
                    },
                });
                return () => unsubscribe();
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <>
            <Title name={me}/>
            <ChatBoxesWrapper
                type="editable-card"
                onChange={async (key) => {
                    setActiveKey(key);
                    setChatBoxName(makeName(me, key))
                    await startChat({variables: {from: me, to: key}});
                }}
                activeKey={activeKey}
                onEdit={async (targetKey, action) => {
                    if (action === 'add')
                        setModalOpen(true);
                    else if (action === 'remove') {
                        const ret = await removeChatBox(targetKey, activeKey)
                        /*setChatBoxName(makeName(me, ret))
                        setActiveKey(ret);
                        console.log("after remove, chatBoxName:", chatBoxName)
                        await startChat({variables: {from: me, to: ret}});*/
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
                        console.log("name =", name)
                        setChatBoxName(makeName(me, name))
                        console.log("chatBoxNameRef.current 1 =", chatBoxNameRef.current)
                        // await getMessages({variables: {chatBoxName: chatBoxName}})

                        const ret = await startChat({variables: {from: me, to: name}});
                        console.log("ret =", ret)
                        // startChat(me, name);
                        createChatBox(name)
                        console.log("after createChatBox, data:", data)
                        // handleSubmit()
                        setActiveKey(name);

                        setModalOpen(false);
                    }


                }}
                /*{({name}) => {

            }}*/
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
                        displayStatus({
                            type: "error",
                            msg: "Please enter a message!"
                        })
                        return
                    }
                    const ret = await sendMessage({variables: {from: me, to: activeKey, body: msg}});
                    console.log("ret:", ret)
                    console.log("data:", data)
                    console.log("me:", me)
                    // sendMessage({from: me, to: activeKey, body: msg})
                    setBody("")
                }}
            ></Input.Search>
            <button
                onClick={() => getMessages({variables: {chatBoxName: chatBoxName}})
                }>
                chatBoxName
            </button>

        </>
    )
}

export default ChatRoom