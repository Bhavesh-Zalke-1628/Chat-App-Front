import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import ProfileModel from './ProfileModel'
import { getSender, getSenderFull } from '../../Config/ChatLogic'
import GroupChatModal from './UpdateGroupChatModal'

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState()
    console.log('selectedChat', selectedChat)
    console.log(user)
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
                                onClick={() => selectedChat('')}
                            />
                            {console.log(selectedChat.isGroupChat)}
                            {
                                (!selectedChat.isGroupChat
                                    ?
                                    (
                                        <>
                                            {
                                                console.log(getSender(user, selectedChat.users))
                                            }
                                            {getSender(user, selectedChat.users)}
                                            <ProfileModel
                                                user={getSenderFull(user, selectedChat.users)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {selectedChat.chatName.toUpperCase()}
                                            {/* <GroupChatModal
                                                fetchMessages={fetchMessages}
                                                fetchAgain={fetchAgain}
                                                setFetchAgain={setFetchAgain}
                                            /> */}
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
                            {/* msg here  */}
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