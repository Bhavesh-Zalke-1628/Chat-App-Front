import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;