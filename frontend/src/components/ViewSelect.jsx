import React from "react";
import { Button, Flex, ButtonGroup, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function ViewSelect(props) {
  const { setViewValue, setModalState, onOpen } = props;

  return (
    <Flex justify="end" mr="2em">
      <ButtonGroup variant="outline" spacing="6">
        <IconButton
          aria-label="Search database"
          borderRadius="50%"
          icon={<AddIcon />}
          onClick={() => {
            setModalState("projects");
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
