import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {message} from "antd";

const ChatContext = createContext();

const ChatProvider = (props) => {
    const savedMe = localStorage.getItem("save-me");
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem("save-me", me);
        }
    }, [signedIn]);

    const displayStatus = (s) => {
        if (s.msg) {
            const {type, msg} = s;
            const content = {content: msg, duration: 1}
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
                me,
                setMe,
                signedIn,
                setSignedIn,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);
export {ChatProvider, useChat};