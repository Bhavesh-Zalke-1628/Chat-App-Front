import React, { useState } from 'react'
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'


function LogIn() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState();
    const [conformPassword, setConformPassword] = useState();

    const handleClick = () => setShow(!show)
    const postDetails = (pic) => {

    }

    const submitHandler = () => {

    }
    return (
        <VStack spacing='5px' color='black'>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme='blue'
                w='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Log In
            </Button>
            <Button
                colorScheme='red'
                w='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Guest
            </Button>
        </VStack >
    )

}

export default LogIn
