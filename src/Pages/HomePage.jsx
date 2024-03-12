import React from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import LogIn from '../Component/LogIn'
import SignUp from '../Component/SignUp'
function HomePage() {
    return (
        <Container height='100vh' w="100vw" centerContent bg='blue' >
            <Box
                d='flex'
                justifyContent='center'
                alignItems='center'
                p={3}
                bg='white'
                w='100%'
                m="40px 0 15px 0 "
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text fontSize='2xl' textAlign='center'>
                    Talk-A-Tive
                </Text>
            </Box>
            <Box
                bg='white'
                w='100%'
                m="40px 0 15px 0 "
                borderRadius='lg'
                borderWidth='1px'
                color='black'
            >
                <Tabs variant='soft-rounded'>
                    <TabList p={2} mb='1rem'>
                        <Tab w="50%">
                            Log In
                        </Tab>
                        <Tab w="50%">
                            Sing Up
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LogIn />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container >
    )
}

export default HomePage
