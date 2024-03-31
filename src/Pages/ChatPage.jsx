import React from 'react'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../Component/Neccessary/SideDrawer'
import MyChats from '../Component/Neccessary/MyChats'
import ChatBox from '../Component/Neccessary/ChatBox'
import { ChatState } from '../Context/ChatProvider'

function ChatPage() {

    const { user } = ChatState()
    console.log(user)
    return (
        <div
            style={{ width: '100%' }}
        >
            {<SideDrawer />}
            <Box
                display="flex"
                justifyContent='space-between'
                w='100%'
                h='90.5vh'
                p="10px"
            >
                {<MyChats />}
                {<ChatBox />}
            </Box>
        </div >
    )
}

export default ChatPage
