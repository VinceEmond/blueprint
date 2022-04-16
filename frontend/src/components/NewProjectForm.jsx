import React from "react";
import {
  Editable,
  EditableInput,
  Select,
  EditablePreview,
  Container,
  HStack,
  Textarea,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function NewTaskForm() {
  return (
    <Container mt="4em">
      <HStack mt="1em">
        <Editable
          defaultValue="Enter task here..."
          width="70%"
          display="flex"
          alignItems="left"
        >
          <EditablePreview display="flex" />
          <EditableInput display="flex" />
        </Editable>
        <Select placeholder="Select option" width="30%" display="flex">
          <option value="option1">Not Started</option>
          <option value="option2">In Progress</option>
          <option value="option3">Pending</option>
          <option value="option3">Complete</option>
        </Select>
      </HStack>
      <HStack mt="1em">
        <p>Owner: </p>
        <Editable defaultValue="Owner name here...." width="80%" display="flex">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </HStack>

      <HStack mt="1em">
        <p>Due Date: </p>
        <Editable defaultValue="Due date here..." width="80%" display="flex">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </HStack>
      <Textarea mt="1em" placeholder="Description here..." />

      <ButtonGroup variant="outline" spacing="6" mt="1em">
        <Button colorScheme="blue">Save</Button>
      </ButtonGroup>
    </Container>
  );
}
