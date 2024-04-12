
import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
// import { Axios } from 'axios'
import axios from 'axios'
function MyChats() {
    const [loggedUser, setLoggedUser] = useState('')
    const { user, selectedChat, setSelectedChat, chats, setChats, } = ChatState()
    const toast = useToast()
    const fetchChats = async () => {
        console.log('user', user.token);
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get("http://localhost:5000/api/chat", config);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };


    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("userInfo")))
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        // console.log(log)
        console.log('loggedUser', loggedUser)
        console.log("hello")
        fetchChats();
        console.log('byyy')
    }, []);
    console.log('loggedUser', loggedUser)
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChats()
    }, []);
    return (
        <div >

        </div>
    )
}

export default MyChats