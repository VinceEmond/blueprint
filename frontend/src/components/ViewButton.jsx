import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuDivider,
  Button,
  Flex,
} from "@chakra-ui/react";

export default function ViewButton(props) {
  const { setButtonValue } = props;

  return (
    <Flex justify="end" mr="2em">
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} colorScheme="blue">
          Views
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuItemOption value="List" onClick={() => setButtonValue("List")}>
            List
          </MenuItemOption>
          <MenuItemOption value="Board" onClick={() => setButtonValue("Board")}>
            Board
          </MenuItemOption>
        </MenuList>
      </Menu>
    </Flex>
  );
}
