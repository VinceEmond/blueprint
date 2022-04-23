import React, { useState, useEffect, useRef, useContext } from "react";
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
import { usersContext } from "../Providers/UsersProvider";

export default function DrawerExample() {
  const divRef = useRef(null);
  const { cookies, currentUser, getUserByID } = useContext(usersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = React.useRef();
  const [messages, setMessages] = useState([]);
  const [messageBox, setMessageBox] = useState("");

  const divStyle = {
    overflowY: "scroll",
    position: "relative",
  };

  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do, h:mma");
  };

  // Scrolls the chats up when the limit is reached
  useEffect(() => {
    if (divRef.current) {
      scrollToBottom();
    }
  }, [messages]);

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

  const handleMessageBox = (event) => {
    setMessageBox(event.target.value);
  };

  const validMessage = (message) => {
    return message.trim();
  };

  // const resetMessageBoxInput = () => {};

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (validMessage(messageBox)) {
      const currentUserId = Number(cookies.id);
      const messageBoxContent = messageBox.trim();
      const currentTimeStamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

      const newMessageObj = {
        sender_id: currentUserId,
        content: messageBoxContent,
        time_stamp: currentTimeStamp,
      };

      axios
        .post("/api/messages", newMessageObj)
        .then((response) => {
          setMessages((prev) => [...prev, newMessageObj]);
          setMessageBox("");
          inputRef.current.focus();
        })
        .catch((err) => console.log("err:", err));
    }
  };

  const handleVideoChat = () => {
    window.open("https://meet.google.com/new");
  };

  const createMessageComponents = (messages) => {
    return messages.map((message, index) => {
      let color = "#3182CE";
      let avatar = "";
      let messageTimestamp = formatDate(message.time_stamp);
      let senderName = "Unknown Sender";
      let receiver = true;
      let justify = "flex-start";

      // ******* THIS IS TO MAKE SURE IT ONLY RETRIEVES ONCE STATE IS READY
      if (currentUser) {
        // senderName = getUserByID(1).first_name;
        // console.log("Get user:", getUserByID(1).first_name);
        // console.log("Current user.first_name", currentUser.first_name);
        // senderName = currentUser.first_name;
        // console.log("Get user by id", getUserByID(message.sender_id).first_name);
        // console.log("Avatar for user", getUserByID(message.sender_id).avatar);

        // if (getUserByID(message.sender_id).id === 1){
        //   color = "#3182CE";
        // } else if (getUserByID(message.sender_id).id === 1){

        senderName = getUserByID(message.sender_id).first_name;
        avatar = getUserByID(message.sender_id).avatar;
      }

      // Set specific color by user's ID
      // if (message.sender_id === 1) {
      //   // Dylan
      //   color = "#2b6cb0";
      // } else if (message.sender_id === 2) {
      //   // Pablo
      //   color = "#90cdf4";
      // } else if (message.sender_id === 3) {
      //   color = "#4299e1";
      //   // Vince
      // }

      // Alternate colors for messages regardless of userID
      if (index % 2 === 0) {
        color = "#3182CE";
      } else {
        color = "#63B3ED";
      }

      // Checks: Is current user the sender?
      // if (currentUser && message) {
      //   console.log("currentUser.id", currentUser.id);
      //   console.log("message.sender_id", message.sender_id);
      //   if (currentUser.id === message.sender_id) {
      //     // console.log("cur");
      //     justify = "flex-end";
      //     avatar = "";
      //     receiver = false;
      //   }
      // }

      return (
        <div key={index}>
          <HStack display="flex" justifyContent="center">
            <p>{messageTimestamp}</p>
          </HStack>

          <HStack
            key={index}
            marginLeft="10px"
            marginRight="10px"
            marginTop="4px"
            display="flex"
            flexDirection="row"
            justifyContent={justify}
          >
            <Box boxSize="50px">
              {receiver && (
                <Image
                  src={avatar}
                  alt="Avatar"
                  borderRadius="full"
                  boxSize="50px"
                  maxW="50px"
                  ratio={1}
                />
              )}
            </Box>

            <div>
              <p>{senderName} Says:</p>
              <Box
                key={index}
                borderRadius="lg"
                marginBottom="5px"
                bg={color}
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
  };

  const messagesComponents = createMessageComponents(messages);

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Message Board
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={inputRef}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Team Message Board</DrawerHeader>

          <DrawerBody></DrawerBody>

          <div style={divStyle}>
            {messagesComponents}
            <div ref={divRef}></div>
          </div>

          <HStack display="flex" justifyContent="center">
            <form onSubmit={(e) => handleSendMessage(e)}>
              <Input
                ref={inputRef}
                width="500px"
                placeholder="Type your message here..."
                value={messageBox}
                onChange={(e) => handleMessageBox(e)}
              />
            </form>
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
              onClick={(e) => handleSendMessage(e)}
            >
              Post Message
            </Button>
          </ButtonGroup>
        </DrawerContent>
      </Drawer>
    </>
  );
}
