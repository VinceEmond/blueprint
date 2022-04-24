import React from "react";
import { Button, Flex, ButtonGroup, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function ViewSelect(props) {
  const { setViewValue, setModalState, onOpen, state } = props;

  return (
    <Flex
      justify="end"
      style={{
        backgroundColor: "#0a171e",
        color: "white",
      }}
    >
      <ButtonGroup
        variant="outline"
        spacing="6"
        style={{
          backgroundColor: "#0a171e",
          color: "white",
        }}
      >
        <IconButton
          aria-label="Search database"
          borderRadius="50%"
          icon={<AddIcon />}
          onClick={() => {
            setModalState(state);
            onOpen();
          }}
        />
        <Button
          colorScheme="red"
          value="List"
          size="md"
          onClick={() => setViewValue("List")}
        >
          List
        </Button>
        <Button
          colorScheme="yellow"
          value="Board"
          size="md"
          onClick={() => setViewValue("Board")}
        >
          Board
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
