import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "antd/dist/antd.css";
import {ChatProvider} from "./containers/hooks/useChat";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChatProvider>
        <App/>
    </ChatProvider>
);