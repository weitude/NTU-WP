import {createContext, useContext, useEffect, useState} from "react";
import {message} from "antd";

const ChatContext = createContext();
const client = new WebSocket('ws://localhost:4000')

const sendData = async (data) => {
    await client.send(JSON.stringify(data));
};

const ChatProvider = (props) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatBoxName, setChatBoxName] = useState("")

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn]);

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "start": {
                setMessages(payload);
                break;
            }
            case "output": {
                setMessages([...messages, payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            default:
                break;
        }
    }

    const startChat = (from, to) => {
        sendData(["start", {from, to}])
    }

    const sendMessage = (payload) => {
        sendData(["input", payload]);
    }

    const displayStatus = (s) => {
        if (s.msg) {
            const {type, msg} = s;
            const content = {content: msg, duration: 0.5}
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'error':
                    message.error(content)
                    break
                default:
                    break
            }
        }
    }

    return (
        <ChatContext.Provider
            value={{
                status, me, setMe, signedIn, setSignedIn, messages, chatBoxName, setChatBoxName,
                sendMessage, startChat, displayStatus
            }}
            {...props}
        />
    );
};


const useChat = () => useContext(ChatContext);
export {ChatProvider, useChat};