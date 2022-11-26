import {Input, Tabs} from 'antd'
import styled from 'styled-components';
import {useEffect, useRef, useState} from "react";
import {useChat} from "./hooks/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";

const ChatBoxesWrapper = styled.div`
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
    const {status, me, messages, sendMessage, startChat, setChatBoxName, displayStatus} = useChat()
    const [body, setBody] = useState("");
    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState("")
    const [modalOpen, setModalOpen] = useState(false);
    const msgFooter = useRef(null)

    useEffect(() => {
        displayStatus(status)
    }, [status])

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

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);
        const len = newChatBoxes.length
        if (!len)
            return ""
        if (index === len)
            return newChatBoxes[index - 1].key
        if (targetKey === activeKey)
            return newChatBoxes[index].key
        return activeKey
    };

    return (
        <>
            <Title name={me}/>
            <ChatBoxesWrapper>
                <Tabs
                    type="editable-card"
                    onChange={(key) => {
                        setActiveKey(key);
                        setChatBoxName(makeName(me, key))
                        startChat(me, key);
                    }}
                    activeKey={activeKey}
                    onEdit={(targetKey, action) => {
                        if (action === 'add')
                            setModalOpen(true);
                        else if (action === 'remove') {
                            const ret = removeChatBox(targetKey, activeKey)
                            setActiveKey(ret);
                            setChatBoxName(makeName(me, ret))
                            startChat(me, ret);
                        }
                    }}
                    items={chatBoxes}
                />
            </ChatBoxesWrapper>

            <ChatModal
                open={modalOpen}
                onCreate={({name}) => {
                    if (chatBoxes.some(({key}) => key === name)) {
                        window.alert("chatbox exist!");
                    }
                    else {
                        setActiveKey(name);
                        setChatBoxName(makeName(me, name))
                        startChat(me, name);
                        createChatBox(name)
                        setModalOpen(false);
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
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: "error",
                            msg: "Please enter a username and a message body."
                        })
                        return
                    }
                    sendMessage({from: me, to: activeKey, body: msg})
                    setBody("")
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom