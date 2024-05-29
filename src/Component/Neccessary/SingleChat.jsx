import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import ProfileModel from './ProfileModel'
import { getSender, getSenderFull } from '../../Config/ChatLogic'
import GroupChatModal from './UpdateGroupChatModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState()

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
                                            {console.log(user.user)}
                                            {console.log(selectedChat.users)}
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
                                                // fetchMessages={fetchMessages}
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
                            msg here
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
