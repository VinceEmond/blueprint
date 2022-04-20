import React, { useState, useEffect, useRef } from "react";

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
  Image,
} from "@chakra-ui/react";
import moment from "moment";

export default function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const chatMessagesContainer = React.useRef(null);

  // const sampleMessages = [
  //   "Good morning!",
  //   "Hey!",
  //   "I've completed the message board testing",
  //   "Awesome I'll pull your changes from github",
  // ];

  const sampleMessages = [
    { message: "Good morning!", sender: "Vince" },
    { message: "Hey!" },
    { message: "I've completed the message board testing" },
    { message: "Awesome I'll pull your changes from github" },
  ];

  const divStyle = {
    overflowY: "scroll",
    position: "relative",
  };

  const [messages, setMessages] = useState(sampleMessages);
  const [messageBox, setMessageBox] = useState("");
  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (divRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const handleMessageBox = (event) => setMessageBox(event.target.value);
  const handleSendMessage = () => {
    setMessages((prev) => [...prev, { message: messageBox }]);
    setMessageBox("");
  };

  const handleVideoChat = (event) => {
    window.open("https://meet.google.com/new");
  };

  const messagesComponents = messages.map((m, index) => {
    let color = "#3182CE";
    let justify = "left";
    let avatar = "";
    let userName = "";
    let messageTimestamp = moment().format("MMMM Do, h:mma");

    if (index % 2 === 0) {
      color = "#3182CE";
      avatar =
        "https://i.ibb.co/4WXcywP/Screenshot-of-maya-photo-of-me-35mm.png";
      userName = "Vince";
      // justify = 'left'
    } else {
      color = "#63B3ED";
      avatar = "https://bit.ly/dan-abramov";
      userName = "Dan";
      // justify = 'right'
    }

    return (
      // <HStack display="flex" flexDirection="column">
      <div key={index}>
        <HStack display="flex" justifyContent="center">
          <p>{messageTimestamp}</p>
        </HStack>

        <HStack
          key={index}
          // justifyContent={justify}
          marginLeft="10px"
          marginRight="10px"
          marginTop="4px"
          display="flex"
          flexDirection="row"
          alignContent="flex-start"
          justifyContent="flex-start"
        >
          <Box boxSize="50px">
            <Image src={avatar} alt="Avatar" borderRadius="full" />
          </Box>

          <div>
            <p>{userName} Says:</p>
            <Box
              key={index}
              borderRadius="lg"
              marginBottom="5px"
              bg={color}
              // w='95%'
              p={4}
              color="white"
            >
              <p>{m.message}</p>
            </Box>
          </div>
        </HStack>
      </div>
    );
  });

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Message Board
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay /* This creates the modal effect */ />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Team Message Board</DrawerHeader>

          <DrawerBody></DrawerBody>

          <div style={divStyle}>
            {messagesComponents}
            <div ref={divRef}></div>
          </div>

          <HStack display="flex" justifyContent="center">
            <Textarea
              // mt="1em"
              // margin='1px'

              width="100%"
              placeholder="Type your message here..."
              value={messageBox}
              onChange={(e) => handleMessageBox(e)}
            />
          </HStack>

          <ButtonGroup
            padding="15px"
            spacing="6"
            mt="1em"
            display="flex"
            justifyContent="center"
          >
            <Button
              colorScheme="blue"
              width="150px"
              onClick={() => handleVideoChat()}
            >
              Video Chat
            </Button>
            <Button
              colorScheme="blue"
              width="150px"
              onClick={() => handleSendMessage()}
            >
              Post Message
            </Button>
          </ButtonGroup>
        </DrawerContent>
      </Drawer>
    </>
  );
}
