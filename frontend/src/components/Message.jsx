import React, { useState, useEffect } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useDisclosure,
  Box,
  ButtonGroup,
  Textarea,
  HStack,
  Image
} from '@chakra-ui/react'



export default function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const sampleMessages = ['Good morning!', 'Hey!', 'I\'ve completed the message board testing', 'Awesome I\'ll pull your changes from github', 'Good morning!', 'Hey!', 'I\'ve completed the message board testing', 'Awesome I\'ll pull your changes from github', 'Good morning!', 'Hey!', 'I\'ve completed the message board testing', 'Awesome I\'ll pull your changes from github'];
  const [messages, setMessages] = useState(sampleMessages);
  const [messageBox, setMessageBox] = useState('');



  const handleMessageBox = (event) => setMessageBox(event.target.value)
  const handleSendMessage = () => {
    setMessages((prev)=> [...prev, messageBox])
    setMessageBox('');
  }

  const messagesComponents = messages.map((m, index) => { 

    let color = '#3182CE';
    let justify = 'left';
    let avatar = '';

    if(index % 2 === 0){
      color = '#3182CE'
      avatar = 'https://i.ibb.co/4WXcywP/Screenshot-of-maya-photo-of-me-35mm.png'
      // justify = 'left'
    } else {
      color = '#63B3ED'
      avatar = 'https://bit.ly/dan-abramov'
      // justify = 'right'
    }


    return (
      
      <HStack key={index} display="flex" justifyContent={justify} margin='10px'>

      <Box boxSize='50px'>
          <Image 
          src={avatar}
          alt='Avatar' 
          borderRadius='full'/>
      </Box>

      <Box 
        key={index} 
        borderRadius='lg' 
        marginBottom='10px' 
        marginTop='10px'  
        bg={color} 
        w='95%' 
        p={4} 
        color='white'
      >
        {m}
      </Box>
      </HStack>
      )
  })

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Message Board
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='md'
      >

        <DrawerOverlay /> // This created the modal effect

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Team Message Board</DrawerHeader>

          <DrawerBody>
          </DrawerBody>
            {messagesComponents}   

          <HStack display="flex" justifyContent="center">
            <Textarea
              // mt="1em"
              // margin='1px'
             
              width='100%'
              placeholder="Type your message here..."
              value={messageBox}
              onChange={(e) => handleMessageBox(e)}
            />
          </HStack>

          <ButtonGroup padding='15px' spacing="6" mt="1em"  display="flex" justifyContent="center">
            <Button colorScheme="blue" width='150px' onClick={()=> handleSendMessage()}>Post Message</Button>
          </ButtonGroup>


        </DrawerContent>
      </Drawer>
    </>
  )
}