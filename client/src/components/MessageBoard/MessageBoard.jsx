import React, { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import axios from "axios";
import Message from "./Message";
import "../App/App.css";
import { displayServerError } from "../../helpers/main_helpers";
import { usersContext } from "../../Providers/UsersProvider";
import {
  formatDate,
  scrollToBottom,
  validMessage,
} from "../../helpers/messageboard_helpers";
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

export default function MessageBoard() {
  const newestMessageDivRef = useRef(null);
  const messageInputRef = React.useRef();
  const [messages, setMessages] = useState([]);
  const [messageBox, setMessageBox] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cookies, currentUser, getUserByID, allUsers, setAllUsers } =
    useContext(usersContext);

  const DEFAULT_SENDER_AVATAR = "";
  const DEFAULT_SENDER_NAME = "Unknown Sender";
  const MESSAGE_BUBBLE_COLOR_1 = "#c98e1f";
  const MESSAGE_BUBBLE_COLOR_2 = "#6b4e19";
  const MESSAGE_BOARD_BACKGROUND = "rgba(10,23,30,0.3)";
  const TWILIO_ALERT_MESSAGE =
    "Blueprint Notification: You've got an unread message on your team message board!";

  useEffect(() => {
    // Auto-Scrolls the chats messages upwards
    if (newestMessageDivRef.current) {
      scrollToBottom(newestMessageDivRef);
    }
  }, [messages]);

  useEffect(() => {
    axios
      .get("/api/messages")
      .then((response) => {
        const allMessages = response.data.messages;
        setMessages(allMessages);
      })
      .catch((error) => displayServerError(error));
  }, []);

  function handleMessageBox(e) {
    setMessageBox(e.target.value);
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

  function sendTextMessage() {
    const subscribedUsers = [];

    allUsers.forEach((user) => {
      if (user.text_alert) {
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
    <div style={{ color: "white" }}>
      <Button
        colorScheme={"white"}
        bg={"teal.400"}
        rounded={"full"}
        _hover={{
          bg: "teal.500",
          color: "white",
        }}
        onClick={onOpen}
        m="10px"
      >
        Message Board
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={messageInputRef}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay backdropFilter="blur(5px)" />

        <DrawerContent
          style={{
            backgroundColor: MESSAGE_BOARD_BACKGROUND,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderWidth: "3px",
            borderRadius: "6px",
          }}
        >
          <DrawerCloseButton colorScheme="white" />
          <DrawerHeader
            borderBottom="3px solid white"
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "rgba(10,23,30,1)",
            }}
          >
            Team Message Board
          </DrawerHeader>

          <DrawerBody></DrawerBody>

          <div style={{ overflowY: "scroll", position: "relative" }}>
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
                color="white"
              />
            </form>
          </HStack>
          <div
            style={{
              backgroundColor: "rgba(10,23,30,1)",
            }}
          >
            <ButtonGroup
              spacing="6"
              m="1em"
              display="flex"
              justifyContent="center"
            >
              <Button
                colorScheme="teal"
                width="150px"
                onClick={() => handleVideoChat()}
              >
                Video Chat
              </Button>
              <Button
                colorScheme="teal"
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
              <FormLabel style={{ color: "white" }} mb="0">
                Enable text alerts?
              </FormLabel>
              <Switch
                defaultChecked={currentUser ? currentUser.text_alert : false}
                id="text-alerts"
                onChange={(e) => handleAlertSwitch(e)}
                colorScheme="yellow"
              />
            </FormControl>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
