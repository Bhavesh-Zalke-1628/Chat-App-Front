import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Toast, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar'
import React from 'react'
import { useState } from 'react'
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import ChatLoadingComponent from './ChatLoadingComponent';
function SideDrawer() {
    const navigate = useNavigate()
    const [search, setsearch] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false);
    const [loadingChat, setloadingChat] = useState('');
    const { user } = ChatState()
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
        }
        try {
            setloading(true)
            const config = {
                headers: {
                    Authrization: `Bearer ${user.token}`
                }
            }

            const data = await axios.get(`/api/user?search=${search}`, config)
            console.log(data)
            setloading(false)
            setsearchResult(data)
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

    const accesschat = (userID) => {
    }
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
                                console.log(searchResult)
                                // searchResult?.map(user => (
                                //     <UserListItem
                                //         key={user?._id}
                                //         user={user}
                                //         handleFunction={() => accesschat(user._id)}
                                //     />
                                // ))
                            )
                        }
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </div >
    )
}

export default SideDrawer
