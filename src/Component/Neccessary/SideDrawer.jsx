import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar'
import React from 'react'
import { useState } from 'react'
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router';
import { ChatState } from '../../Context/ChatProvider';
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
                    <Button variant="ghost" >
                        <i className="fas fa-search"></i>
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    hello
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
                            <ProfileModel>
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
        </div>
    )
}

export default SideDrawer
