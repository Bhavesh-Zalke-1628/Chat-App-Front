import React, { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ProfileModel from './ProfileModel';
import { getSender, getSenderFull } from '../../Config/ChatLogic';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
let socket, selectedChatCompare;

// function SingleChat({ fetchAgain, setFetchAgain }) {
//     const { user, selectedChat, setSelectedChat } = ChatState();
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [newMessage, setNewMessage] = useState("");
//     const [socketConnected, setSocketConnected] = useState(false);
//     const toast = useToast();

//     const sendMessage = async (e) => {
//         if (e.key === "Enter" && newMessage) {
//             try {
//                 const config = {
//                     headers: {
//                         "Content-Type": 'application/json',
//                         Authorization: `Bearer ${user.token}`
//                     }
//                 };
//                 setNewMessage('');
//                 const { data } = await axios.post(`http://localhost:5000/api/message`, {
//                     content: newMessage,
//                     chatId: selectedChat._id
//                 }, config);
//                 console.log(data);

//                 // socket.emit('new message', data)
//                 socket.emit("new message", data);
//                 setMessages([...messages, data]);
//             } catch (error) {
//                 toast({
//                     title: 'Error Occurred!',
//                     description: "Failed to send the message",
//                     duration: 5000,
//                     isClosable: true,
//                     position: 'bottom-left'
//                 });
//             }
//         }
//     };

//     const fetchMessages = async () => {
//         if (!selectedChat) return;

//         try {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             };

//             setLoading(true);

//             const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config);

//             setMessages(data);
//             setLoading(false);
//             socket.emit("join chat", selectedChat._id);

//         } catch (error) {
//             toast({
//                 title: "Error Occurred!",
//                 description: "Failed to Load the Messages",
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom",
//             });
//         }
//     };

//     const typingHandler = (e) => {
//         setNewMessage(e.target.value);
//         // typing indicator logic
//     };


//     // useEffect(() => {
//     //     socket = io(ENDPOINT);
//     //     console.log('user', user.user)
//     //     socket.emit('setup', user.user);
//     //     socket.on('connected', () => setSocketConnected(true));
//     // }, []);


//     // useEffect(() => {
//     //     socket.on('message received', (newMessageReceived) => {
//     //         if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
//     //             // give nofication
//     //         } else {
//     //             setMessages([...messages, newMessageReceived])
//     //         }
//     //     })
//     // });
//     // useEffect(() => {
//     //     fetchMessages();
//     //     selectedChatCompare == selectedChat
//     // }, [selectedChat]);


//     useEffect(() => {
//         socket = io(ENDPOINT);
//         socket.emit("setup", user);
//         socket.on("connected", () => setSocketConnected(true));
//         // socket.on("typing", () => setIsTyping(true));
//         // socket.on("stop typing", () => setIsTyping(false));

//         // eslint-disable-next-line
//     }, []);

//     useEffect(() => {
//         fetchMessages();
//         selectedChatCompare = selectedChat;
//         // eslint-disable-next-line
//     }, [selectedChat]);

//     useEffect(() => {
//         socket.on("message recieved", (newMessageRecieved) => {

//             if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
//                 // give nofication
//             } else {
//                 setMessages([...messages, newMessageReceived])
//             }
//         })

//     });

//     return (
//         <>
//             {selectedChat ? (
//                 <>
//                     <Text
//                         fontSize={{ base: "28px", md: "30px" }}
//                         pb={3}
//                         px={2}
//                         w='100%'
//                         display='flex'
//                         fontFamily='Work Sans'
//                         justifyContent={{ base: 'space-between' }}
//                         alignItems='center'
//                     >
//                         <IconButton
//                             display={{ base: 'flex', md: 'none' }}
//                             icon={<ArrowBackIcon />}
//                             onClick={() => setSelectedChat('')}
//                         />
//                         {!selectedChat.isGroupChat ? (
//                             <>
//                                 {getSender(user, selectedChat.users)}
//                                 <ProfileModel user={getSenderFull(user, selectedChat.users)} />
//                             </>
//                         ) : (
//                             <>
//                                 {selectedChat.chatName.toUpperCase()}
//                                 <UpdateGroupChatModal
//                                     fetchMessages={fetchMessages}
//                                     fetchAgain={fetchAgain}
//                                     setFetchAgain={setFetchAgain}
//                                 />
//                             </>
//                         )}
//                     </Text>
//                     <Box
//                         display="flex"
//                         flexDir="column"
//                         justifyContent="flex-end"
//                         p={3}
//                         bg="#E8E8E8"
//                         w="100%"
//                         h="100%"
//                         borderRadius="lg"
//                         overflowY="hidden"
//                     >
//                         {loading ? (
//                             <Spinner
//                                 size='xl'
//                                 w={20}
//                                 h={20}
//                                 margin='auto'
//                                 alignSelf='center'
//                             />
//                         ) : (
//                             <div className='flex flex-col overflow-y-scroll '>
//                                 {console.log(messages)}
//                                 <ScrollableChat messages={messages} />
//                             </div>
//                         )}
//                         <FormControl onKeyDown={sendMessage} isRequired mt={3}>
//                             <Input
//                                 variant="filled"
//                                 placeholder="Enter a message..."
//                                 bg="#E0E0E0"
//                                 onChange={typingHandler}
//                                 value={newMessage}
//                             />
//                         </FormControl>
//                     </Box>
//                 </>
//             ) : (
//                 <Box display='flex' alignItems='center' justifyContent='center' h='100%'>
//                     <Text fontSize='3xl' pb={3} fontFamily='Work sans'>
//                         Click on a user to start chatting
//                     </Text>
//                 </Box>
//             )}
//         </>
//     );
// }

// export default SingleChat;



// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// // import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from '../../animation/typing.json';

// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
// var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const { selectedChat, setSelectedChat, user, notification, setNotification } =
        ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(
                `http://localhost:5000/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
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

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "http://localhost:5000/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {messages &&
                            (!selectedChat.isGroupChat ? (
                                <>
                                    {getSender(user, selectedChat.users)}
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
                            ))}
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
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="messages">
                                {/* <ScrollableChat messages={messages} /> */}
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            mt={3}
                        >
                            {istyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                // to get socket.io on same page
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChat;