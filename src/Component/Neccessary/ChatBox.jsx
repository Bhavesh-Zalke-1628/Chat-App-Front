import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'

function ChatBox({ fetchAgain, setFetchAgain }) {
    const { selectedChat } = ChatState()
    return (
        <Box
            display={{ base: selectedChat ? 'flex' : 'none', md: "flex" }}
            alignItems='center'
            flexDir='column'
            bg='white'
            borderRadius='lg'
            borderWidth='1px'
            w={{ base: '100%', md: '68%' }}
        >
            {console.log(fetchAgain)}
            {/* {console.log(fetchAgain)} */}

            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
}

export default ChatBox