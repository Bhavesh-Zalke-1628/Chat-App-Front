import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useTab, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import ProfileModel from './ProfileModel'
import { getSender, getSenderFull } from '../../Config/ChatLogic'
import GroupChatModal from './UpdateGroupChatModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'


function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const toast = useToast()

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage)
            try {
                const config = {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${user.token}`
                    }
                }
                setNewMessage('')
                const { data } = await axios.post(`http://localhost:5000/api/message`, {
                    content: newMessage,
                    chatId: selectedChat._id
                }, config)
                console.log(data)
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: 'Error Occured!',
                    description: "Failed to send the message",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-left'
                })
            }
    }

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config)

            await setMessages(data);
            setLoading(false);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };


    const typingHandler = (e) => {
        setNewMessage(e.target.value)
        // typing indicator logic
    }

    useEffect(() => {
        fetchMessages()
    }, [selectedChat]);


    return (
        <>
            {
                selectedChat ? (
                    <>
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            pb={3}
                            px={2}
                            w='100%'
                            display='flex'
                            fontFamily='Work Sans'
                            justifyContent={{ base: 'space-between' }}
                            alignItems='center'
                        >
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                icon={<ArrowBackIcon />}
                                onClick={() => setSelectedChat('')}
                            />
                            {
                                (!selectedChat.isGroupChat
                                    ?
                                    (
                                        <>
                                            {
                                                getSender(user.user, selectedChat.users)
                                            }
                                            <ProfileModel
                                                user={getSenderFull(user, selectedChat.users)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {selectedChat.chatName.toUpperCase()}
                                            <UpdateGroupChatModal
                                                fetchMessages={fetchMessages}
                                                fetchAgain={fetchAgain}
                                                setFetchAgain={setFetchAgain}
                                            />
                                        </>
                                    ))
                            }
                        </Text>
                        <Box
                            display="flex"
                            flexDir="column"
                            justifyContent="flex-end"
                            p={3}
                            bg="#E8E8E8"
                            w="100%"
                            h="100%"
                            borderRadius="lg"
                            overflowY="hidden"
                        >
                            {loading ? (
                                <Spinner
                                    size='xl'
                                    w={20}
                                    h={20}
                                    margin='auto'
                                    alignSelf='center'
                                />
                            ) : (
                                <div
                                    className='flex flex-col overflow-y-scroll '
                                >
                                    {
                                        console.log(messages)
                                    }

                                    <ScrollableChat messages={messages} />

                                </div>
                            )}
                            <FormControl
                                onKeyDown={sendMessage}
                                isRequired
                                mt={3}
                            >
                                <Input
                                    variant="filled"
                                    placeholder="Enter a message..."
                                    bg="#E0E0E0"
                                    onChange={typingHandler}
                                    value={newMessage}
                                />
                            </FormControl>
                        </Box>
                    </>
                ) : (
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        h='100%'
                    >
                        <Text
                            fontSize='3xl'
                            pb={3}
                            fontFamily='Work sans'
                        >
                            Click on user to start chating
                        </Text>
                    </Box >
                )
            }
        </>
    )
}

export default SingleChat

