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
import { useEffect } from "react";

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
    // Set url based on Links array
    href={`/${children === "Dashboard" ? "" : children.toLowerCase()}`}
  >
    {children}
  </Link>
);

export default function NavBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginHandler, logoutHandler, transcript, resetTranscript } = props;

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "1") {
        SpeechRecognition.startListening();
      } else if (e.key === "2") {
        SpeechRecognition.stopListening();
        resetTranscript();
      }
    });
  }, []);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link
                href="/welcome"
                rounded={"md"}
                _focus={{ boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
              >
                blueprint.
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <div style={{ marginLeft: "2em" }}>
                <p>Command Transcript History: {transcript}</p>
              </div>
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
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
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>

              <MenuList>
                <a href="/">
                  <MenuItem onClick={() => loginHandler("Dylan", 1)}>
                    Dylan
                  </MenuItem>
                </a>
                <a href="/">
                  <MenuItem onClick={() => loginHandler("Vince", 3)}>
                    Vince
                  </MenuItem>
                </a>
                <a href="/">
                  <MenuItem onClick={() => loginHandler("Pablo", 2)}>
                    Pablo
                  </MenuItem>
                </a>
                <a href="/welcome">
                  <MenuItem onClick={(e) => logoutHandler(e)}>Logout</MenuItem>
                </a>
              </MenuList>
            </Menu>
          </Flex>
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

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
