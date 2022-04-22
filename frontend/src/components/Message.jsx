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
import axios from "axios";

export default function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const initialFocusRef = React.useRef();

  const divStyle = {
    overflowY: "scroll",
    position: "relative",
  };

  const [messages, setMessages] = useState([]);
  const [messageBox, setMessageBox] = useState("");
  const [currentUser, setCurrentUser] = useState(1);
  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    return moment(dateString, "YYYY-MM-DD HH:mm:ss").format("MMMM Do, h:mma");
  };

  // Scrolls the chats up when the limi is reached
  useEffect(() => {
    if (divRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  // useEffect(() => {
  //   console.log("Date test", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  // }, []);

  // When mounted, API call for DB query for all messages
  useEffect(() => {
    axios
      .get("/api/messages")
      .then((response) => {
        const allMessages = response.data.messages;
        setMessages(allMessages);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  const handleMessageBox = (event) => setMessageBox(event.target.value);
  const handleSendMessage = () => {
    const newMessageObj = {
      sender_id: 1,
      content: messageBox,
      // sender_id: currentUser || 'unknown user',
      time_stamp: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };

    // console.log("Sending via axios", newMessageObj);

    axios
      .post("/api/messages", newMessageObj)
      .then((response) => {
        // setUserTasks((prev) => {
        //   return [...prev, taskFormValues];
        // });
        setMessages((prev) => [...prev, newMessageObj]);

        console.log(
          "Succesfully added the following message to the database:",
          newMessageObj
        );
      })
      .catch((err) => console.log("err:", err));

    setMessageBox("");
  };

  const handleVideoChat = (event) => {
    window.open("https://meet.google.com/new");
  };

  const messagesComponents = messages.map((message, index) => {
    let color = "#3182CE";
    let justify = "left";
    let avatar = "";
    let userName = "";
    // let messageTimestamp = moment().format("MMMM Do, h:mma");

    // console.log("Time from database:", message.time_stamp);

    let messageTimestamp = formatDate(message.time_stamp);
    let senderName = "Unknown Sender";

    if (message.sender_id === 1) {
      senderName = "Dylan";
    } else if (message.sender_id === 2) {
      senderName = "Pablo";
    } else if (message.sender_id === 3) {
      senderName = "Vince";
    }

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
            <p>{senderName} Says:</p>
            <Box
              key={index}
              borderRadius="lg"
              marginBottom="5px"
              bg={color}
              // w='95%'
              p={4}
              color="white"
            >
              <p>{message.content}</p>
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
        initialFocusRef={initialFocusRef}
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
              ref={initialFocusRef}
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
        <DrawerFooter></DrawerFooter>
      </Drawer>
    </>
  );
}
