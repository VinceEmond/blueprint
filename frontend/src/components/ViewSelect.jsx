import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
  Flex,
} from "@chakra-ui/react";

export default function ViewSelect(props) {
  const { setViewValue } = props;

  return (
    <Flex justify="end" mr="2em">
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} colorScheme="blue">
          Views
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuItemOption value="List" onClick={() => setViewValue("List")}>
            List
          </MenuItemOption>
          <MenuItemOption value="Board" onClick={() => setViewValue("Board")}>
            Board
          </MenuItemOption>
        </MenuList>
      </Menu>
    </Flex>
  );
}
