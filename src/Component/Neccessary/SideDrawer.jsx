import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Toast, useToast, Spinner } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import ChatLoadingComponent from './ChatloadingComponent';
import UserListItem from '../UserAvatar/UserList';
function SideDrawer() {
    const navigate = useNavigate()
    const [search, setsearch] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false);
    const [loadingChat, setloadingChat] = useState('');
    const { user, setSelectedChat, chats, setChats, } = ChatState()
    console.log(user)
    const logOutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    }
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        try {
            setloading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const data = await axios.get(`http://localhost:5000/api/user?search=${search}`, config)
            console.log(data)
            setloading(false)
            setsearchResult(data.data)
        } catch (error) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }


    const accesschat = async (userId) => {
        console.log(userId);
        console.log('accesschat')
        console.log(user.token)
        try {
            setloadingChat(true);
            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config)
            console.log('data', data)
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setloadingChat(false)
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };
    return (
        <div>
            <Box
                display='flex'
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen} >
                        <i className="fas fa-search"></i>
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat Grow
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize='2xl' m={2} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Avatar
                                size='sm'
                                cursor="pointer"
                                name="b"
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                {/* <MenuItem>
                                    My Profile
                                </MenuItem> */}
                            </ProfileModel>
                            <MenuDivider />
                            <MenuItem onClick={logOutHandler}>
                                Log Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer
                placement='left'
                onClose={onclose}
                isOpen={isOpen}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader
                        borderBottomWidth='1px'
                    >
                        Search user
                    </DrawerHeader>
                    <DrawerBody>
                        <Box
                            display='flex'
                            pb={2}
                        >
                            <Input
                                placeholder='search by name'
                                mr={2}
                                value={search}
                                onChange={(e) => setsearch(e.target.value)}
                            />
                            <Button
                                onClick={handleSearch}
                            >
                                Go
                            </Button>
                        </Box>
                        {
                            loading ? (
                                <ChatLoadingComponent />
                            ) : (
                                searchResult?.map(user => (
                                    // console.log(' find', user)
                                    <UserListItem
                                        key={user?._id}
                                        user={user}
                                        handleFunction={() => accesschat(user._id)}
                                    />
                                ))
                            )
                            // console.log(searchResult.data)
                        }
                        {loadingChat && <Spinner ml='auto' display="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div >
    )
}

export default SideDrawer