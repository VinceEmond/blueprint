import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import SpeechRecognition from "react-speech-recognition";
import { useEffect, useContext, useState } from "react";
import MessageBoard from "../MessageBoard/MessageBoard";
import { usersContext } from "../../Providers/UsersProvider";

const Links = ["Dashboard", "Projects", "Tasks"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={`/${children === "Dashboard" ? "welcome" : children.toLowerCase()}`}
  >
    {children}
  </Link>
);

export default function NavBar({ transcript, resetTranscript }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { login, logout, cookies } = useContext(usersContext);
  const [voiceCommand, setVoiceCommand] = useState(false);

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "1") {
        SpeechRecognition.startListening();
        setVoiceCommand(true);
      } else if (e.key === "2") {
        SpeechRecognition.stopListening();
        resetTranscript();
        setVoiceCommand(false);
      }
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0a171e",
        color: "white",
      }}
    >
      <Box bg={"0a171e"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <div>
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Link
                  href="/"
                  rounded={"md"}
                  _focus={{ boxShadow: "none" }}
                  _hover={{ textDecoration: "none" }}
                >
                  blueprint.
                </Link>
              </Box>
              {cookies.id && (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}
                </HStack>
              )}
            </HStack>
          </div>
          <div>
            {voiceCommand && (
              <p style={{ marginRight: "10em", color: "red" }}>
                Listening: {transcript}
              </p>
            )}
          </div>
          <div>
            <Flex alignItems={"center"}>
              {cookies.id && <MessageBoard />}
              {!cookies.id && (
                <Button
                  colorScheme="teal"
                  onClick={onOpen}
                  m="10px"
                  as="a"
                  href="/login"
                >
                  Login
                </Button>
              )}
              {!cookies.id && (
                <Button
                  colorScheme="teal"
                  onClick={onOpen}
                  m="10px"
                  style={{ marginRight: "1em" }}
                  as="a"
                  href="/register"
                >
                  Register
                </Button>
              )}
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://cdn5.vectorstock.com/i/thumb-large/71/34/user-icon-line-outline-person-symbol-vector-22867134.jpg"
                    }
                  />
                </MenuButton>

                <MenuList>
                  <a href="/welcome">
                    <MenuItem
                      onClick={() => login(1)}
                      style={{ color: "black" }}
                    >
                      Dylan
                    </MenuItem>
                  </a>
                  <a href="/welcome">
                    <MenuItem
                      onClick={() => login(3)}
                      style={{ color: "black" }}
                    >
                      Vince
                    </MenuItem>
                  </a>
                  <a href="/welcome">
                    <MenuItem
                      onClick={() => login(2)}
                      style={{ color: "black" }}
                    >
                      Pablo
                    </MenuItem>
                  </a>
                  <a href="/">
                    <MenuItem
                      onClick={() => logout()}
                      style={{ color: "black" }}
                    >
                      Logout
                    </MenuItem>
                  </a>
                </MenuList>
              </Menu>
            </Flex>
          </div>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
}
