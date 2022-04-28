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
          border="2px solid white"
          backgroundColor="RGBA(242,171,39,0.8)"
          _hover={{
            bg: "RGBA(242,171,39,0.6)",
          }}
          _active={{
            bg: "RGBA(242,171,39,0.8)",
          }}
        />
        <Button
          backgroundColor="rgba(3,64,58,1)"
          value="List"
          size="md"
          _hover={{
            color: "black",
            boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.9)",
          }}
          onClick={() => setViewValue("List")}
        >
          List
        </Button>
        <Button
          backgroundColor="rgba(3,64,58,1)"
          value="Board"
          size="md"
          _hover={{
            color: "black",
            boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.9)",
          }}
          onClick={() => setViewValue("Board")}
        >
          Board
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
