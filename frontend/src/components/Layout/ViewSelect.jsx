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
        // opacity: "0.9",
        color: "white",
      }}
    >
      <ButtonGroup
        variant="outline"
        spacing="6"
        style={{
          backgroundColor: "#0a171e",
          // opacity: "0.9",
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
          colorScheme="blue"
          value="List"
          size="md"
          onClick={() => setViewValue("List")}
        >
          List
        </Button>
        <Button
          colorScheme="teal"
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
