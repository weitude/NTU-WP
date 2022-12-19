import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {message} from "antd";


const ChatContext = createContext(


);

/*const client = new WebSocket('ws://localhost:4000')

const sendData = async (data) => {
    await client.send(JSON.stringify(data));
};*/

const ChatProvider = (props) => {
    const savedMe = localStorage.getItem("save-me");
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem("save-me", me);
        }
    }, [signedIn]);

    /*client.onmessage = (byteString) => {
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
    }*/

    const displayStatus = (s) => {
        console.log("displayStatus:", s)
        if (s.msg) {
            const {type, msg} = s;
            const content = {content: msg, duration: 0.5}
            switch (type) {
                case 'success':
                    message.success(content).then(() => console.log("success"))
                    break
                case 'error':
                    message.error(content).then(() => console.log("error"))
                    break
                default:
                    break
            }
        }
    }

    return (
        <ChatContext.Provider
            value={{
                // data, sendMessage, startChat, subscribeToMore,
                status, me, setMe, signedIn, setSignedIn,
                // messages, chatBoxName, setChatBoxName, intervalRef,setMessages,
                displayStatus
            }}
            {...props}
        />
    );
};


const useChat = () => useContext(ChatContext);
export {ChatProvider, useChat};