import React from "react";
import {Input} from 'antd'
import {UserOutlined} from "@ant-design/icons";

const LogIn = ({me, setMe, onLogin}) => {
    return (
        <Input.Search
            size="large"
            style={{width: 300, margin: 50}}
            prefix={<UserOutlined/>}
            placeholder="Enter your name"
            value={me}
            onChange={(e) => setMe(e.target.value)}
            enterButton="Sign In"
            onSearch={(name) => onLogin(name)}
        />);
}

export default LogIn;