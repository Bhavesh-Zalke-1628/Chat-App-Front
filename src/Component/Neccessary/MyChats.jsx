
import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
// import { Axios } from 'axios'
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoadingComponent from './ChatloadingComponent'
import { getSender } from '../../Config/ChatLogic'
import GroupChatModel from './GroupChatModel'
function MyChats({ fetchAgain }) {
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
    }, [fetchAgain]);
    console.log('loggedUser', loggedUser)
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChats()
    }, []);
    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
                <GroupChatModel>
                    <Button
                        display="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                    >
                        New Group Chat
                    </Button>
                </GroupChatModel>

            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {console.log(chats)}
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                            >
                                <Text>
                                    {console.log(loggedUser.user)}
                                    {!chat.isGroupChat
                                        ? getSender(loggedUser.user, chat.users)
                                        : chat.chatName}
                                </Text>
                                {chat.latestMessage && (
                                    <Text fontSize="xs">
                                        <b>{chat.latestMessage.sender.name} : </b>
                                        {chat.latestMessage.content.length > 50
                                            ? chat.latestMessage.content.substring(0, 51) + "..."
                                            : chat.latestMessage.content}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoadingComponent />
                )}
            </Box>
        </Box>
    )
}

export default MyChats