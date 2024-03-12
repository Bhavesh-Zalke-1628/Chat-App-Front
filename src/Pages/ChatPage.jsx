import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ChatPage() {

    const [chat, setChat] = useState([])
    const fetchChat = async () => {
        const { data } = await axios.get('http://localhost:5000/api/chat');
        setChat(data);
    }

    useEffect(() => {
        fetchChat()
    }, []);
    return (
        <div>
            {
                chat.map((chat) => {
                    return <div key={chat._id}>{chat.chatName}</div>
                })

            }
        </div>
    )
}

export default ChatPage
