import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useDisclosure,
  ButtonGroup,
  HStack,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import axios from "axios";
import Message from "./Message";
import { usersContext } from "../../Providers/UsersProvider";

export default function MessageBoard() {
  const newestMessageDivRef = useRef(null);
  const messageInputRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState([]);
  const [messageBox, setMessageBox] = useState("");
  const { cookies, currentUser, getUserByID, allUsers, setAllUsers } =
    useContext(usersContext);

  const divStyle = {
    overflowY: "scroll",
    position: "relative",
  };

  function scrollToBottom() {
    newestMessageDivRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function formatDate(dateString) {
    return moment(dateString).format("MMMM Do, h:mma");
  }

  useEffect(() => {
    // Scrolls the chats up when the limit is reached
    if (newestMessageDivRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    axios
      .get("/api/messages")
      .then((response) => {
        const allMessages = response.data.messages;
        setMessages(allMessages);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  function handleMessageBox(e) {
    setMessageBox(e.target.value);
  }

  function validMessage(message) {
    return message.trim();
  }

  function resetMessageBox() {
    setMessageBox("");
    messageInputRef.current.focus();
  }

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
        .then(() => {
          setMessages((prev) => [...prev, newMessageObj]);
          sendTextMessage();
          resetMessageBox();
        })
        .catch((error) => displayServerError(error));
    }
  };

  const handleVideoChat = () => {
    window.open("https://meet.google.com/new");
  };

  const updateUserTextAlert = (id, switchValue) => {
    return allUsers.map((user) => {
      if (user.id === id) {
        user.text_alert = switchValue;
      }
      return user;
    });
  };

  function displayServerError(error) {
    console.log("Server Error:", error);
  }

  function handleAlertSwitch(e) {
    const textAlertSwitch = e.target.checked;
    const currentUserID = Number(cookies.id);
    const queryParams = {
      text_alert: textAlertSwitch,
    };

    axios
      .put(`/api/users/${cookies.id}`, queryParams)
      .then(() => {
        const updatedUsers = updateUserTextAlert(
          currentUserID,
          textAlertSwitch
        );
        setAllUsers(updatedUsers);
      })
      .catch((error) => displayServerError(error));
  }

  const DEFAULT_SENDER_AVATAR = "";
  const DEFAULT_SENDER_NAME = "Unknown Sender";
  const MESSAGE_BUBBLE_COLOR_1 = "#3182CE";
  const MESSAGE_BUBBLE_COLOR_2 = "#63B3ED";

  function createMessageComponents(messages) {
    return messages.map((message, index) => {
      let senderAvatar = DEFAULT_SENDER_AVATAR;
      let senderName = DEFAULT_SENDER_NAME;
      let messageTimestamp = formatDate(message.time_stamp);
      let messageContent = message.content;
      let messageBubbleColor = MESSAGE_BUBBLE_COLOR_1;

      if (currentUser) {
        senderName = getUserByID(message.sender_id).first_name;
        senderAvatar = getUserByID(message.sender_id).avatar;
      }

      if (index % 2 === 0) {
        messageBubbleColor = MESSAGE_BUBBLE_COLOR_1;
      } else {
        messageBubbleColor = MESSAGE_BUBBLE_COLOR_2;
      }

      return (
        <Message
          key={index}
          senderName={senderName}
          senderAvatar={senderAvatar}
          messageTimestamp={messageTimestamp}
          messageContent={messageContent}
          messageBubbleColor={messageBubbleColor}
        />
      );
    });
  }

  const messageComponents = createMessageComponents(messages);
  const TWILIO_ALERT_MESSAGE =
    "Blueprint Notification: You've got an unread message on your team message board!";

  function sendTextMessage() {
    const subscribedUsers = [];
    const currentUserID = Number(cookies.id);

    allUsers.forEach((user) => {
      if (user.text_alert && user.id !== currentUserID) {
        subscribedUsers.push(user.id);
      }
    });

    if (subscribedUsers.length > 0) {
      const queryParams = {
        message: TWILIO_ALERT_MESSAGE,
        recipients: subscribedUsers,
      };

      axios
        .post("/api/notification/", queryParams)
        .then(() => {})
        .catch((error) => displayServerError(error));
    }
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} m="10px">
        Message Board
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={messageInputRef}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Team Message Board</DrawerHeader>

          <DrawerBody></DrawerBody>

          <div style={divStyle}>
            {messageComponents}
            <div ref={newestMessageDivRef}></div>
          </div>

          <HStack display="flex" justifyContent="center">
            <form onSubmit={(e) => handleSendMessage(e)}>
              <Input
                ref={messageInputRef}
                width="500px"
                placeholder="Type your message here..."
                value={messageBox}
                onChange={(e) => handleMessageBox(e)}
              />
            </form>
          </HStack>

          <ButtonGroup
            spacing="6"
            m="1em"
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
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="10px"
          >
            <FormLabel mb="0">Enable text alerts?</FormLabel>
            <Switch
              defaultChecked={currentUser ? currentUser.text_alert : false}
              id="text-alerts"
              onChange={(e) => handleAlertSwitch(e)}
            />
          </FormControl>
        </DrawerContent>
      </Drawer>
    </>
  );
}
