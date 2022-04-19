import React from "react";
import { Button, Flex, ButtonGroup } from "@chakra-ui/react";

export default function ViewSelect(props) {
  const { setViewValue } = props;

  return (
    <Flex justify="end" mr="2em">
      <ButtonGroup variant="outline" spacing="6">
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
