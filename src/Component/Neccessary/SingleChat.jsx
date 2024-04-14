import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

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
                                onClick={() => selectedChat('')}
                            />
                            {
                                !selectedChat.isGroupChat ? (
                                    <>

                                    </>
                                ) : (
                                    <>
                                        33.17
                                    </>
                                )
                            }
                        </Text>
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
