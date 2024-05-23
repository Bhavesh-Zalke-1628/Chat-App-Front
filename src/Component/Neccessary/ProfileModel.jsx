import { ViewIcon } from '@chakra-ui/icons'
import { Text, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { IconButton, Button } from '@chakra-ui/button'
import React from 'react'
import { useNavigate } from 'react-router'
import { ChatState } from '../../Context/ChatProvider'

function ProfileModel({ user, children }) {
    const navigate = useNavigate()
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <>
            {
                children ? (
                    <span onClick={onOpen}></span>
                ) : (
                    <IconButton
                        display={{ base: "flex" }}
                        icon={<ViewIcon />}
                        onClick={onOpen}
                    />
                )}
            < Modal
                size='lg'
                isCentered
                isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    h='410px'
                >
                    <ModalHeader
                        fontSize='40px'
                        display='flex'
                        justifyContent='center'
                    >{user?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src=''
                            alt='bhavesh zalke'
                        />
                        <Text>
                            Email : {user.email}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModel