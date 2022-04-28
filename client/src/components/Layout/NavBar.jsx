import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import MessageBoard from "../MessageBoard/MessageBoard";
import { usersContext } from "../../Providers/UsersProvider";
import AvatarIcon from "../../assets/images/avatar.jpg";
import DylanPirrottaAvatar from "../../assets/images/DylanPirrottaAvatar.jpg";
import PabloTackAvatar from "../../assets/images/PabloTackAvatar.jpg";
import BlueprintLogo from "../../assets/images/blueprint-logo.png";
import VinceEmondAvatar from "../../assets/images/VinceEmondAvatar.jpg";
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
  Stack,
} from "@chakra-ui/react";

const Links = ["Dashboard", "Projects", "Tasks"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      color: "white",
      boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.3)",
    }}
    href={`/${children === "Dashboard" ? "welcome" : children.toLowerCase()}`}
    fontWeight="500"
    fontSize="1.1em"
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { login, logout, cookies } = useContext(usersContext);

  function avatarIcon(cookiesId) {
    if (cookiesId === "1") {
      return DylanPirrottaAvatar;
    } else if (cookiesId === "2") {
      return PabloTackAvatar;
    } else if (cookiesId === "3") {
      return VinceEmondAvatar;
    } else if (!cookiesId) {
      return AvatarIcon;
    }
  }

  function avatarName(cookiesId) {
    if (cookiesId === "1") {
      return "Dylan Pirrotta";
    } else if (cookiesId === "2") {
      return "Pablo Tack";
    } else if (cookiesId === "3") {
      return "Vince Emond";
    } else if (!cookiesId) {
      return "Avatar Icon";
    }
  }

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
              <Box
                width="180px"
                paddingTop="25px"
                paddingBottom="20px"
                paddingLeft="20px"
              >
                <a href="/">
                  <img src={BlueprintLogo} alt="blueprint logo"></img>
                </a>
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
            <Flex alignItems={"center"}>
              {cookies.id && <MessageBoard />}
              {!cookies.id && (
                <Button
                  colorScheme={"white"}
                  bg={"teal.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "teal.500",
                    color: "white",
                  }}
                  onClick={onOpen}
                  as="a"
                  marginRight="10px"
                  href="/login"
                >
                  Login
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
                    name={avatarName(cookies.id)}
                    src={avatarIcon(cookies.id)}
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
