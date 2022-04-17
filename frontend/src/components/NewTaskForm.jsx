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
import axios from "axios";

export default function NewTaskForm() {
  const [formValue, setformValue] = React.useState(null);
  
  // {project_id: 1, priority: "Low", assignee_id: 1, name: "Plant Seeds", description: "I need to plant seeds", start_date: '1969-04-20', due_date: '1969-04-20', modified_date: '2022-04-15', status: 'Not Started', category_id: 1}
  function axiosCall() {
        axios
          .post("/api/tasks", formValue)
          .then((response) => {
            // console.log("RESPONSE FROM FRONTEND: ", response)
          })
          .catch((err) => console.log("err:", err));
  } 

  return (
    <Container mt="4em">
      <HStack mt="1em">
        <Editable
          defaultValue="Enter task here..."
          width="60%"
          display="flex"
          alignItems="left"
        >
          <EditablePreview display="flex" />
          <EditableInput display="flex" />
        </Editable>
        <Select placeholder="Select option" width="40%" display="flex">
          <option value="option1">Not Started</option>
          <option value="option2">In Progress</option>
          <option value="option3">Pending</option>
          <option value="option3">Complete</option>
        </Select>
      </HStack>
      <HStack mt="1em">
        <p>Project_ID:  </p>
        <Editable
          defaultValue="Project_ID name here...."
          width="80%"
          display="flex"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </HStack>
      <HStack mt="1em">
        <p>Assignee:  </p>
        <Editable
          defaultValue="Assginee name here..."
          width="80%"
          display="flex"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </HStack>
      <HStack mt="1em">
        <p>Due Date:  </p>
        <Editable defaultValue="Due date here..." width="70%" display="flex">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </HStack>
      <Textarea mt="1em" placeholder="Description here..." />
      <ButtonGroup variant="outline" spacing="6" mt="1em" display="flex" justifyContent="center">
        <Button colorScheme="green">low</Button>
        <Button colorScheme="yellow">medium</Button>
        <Button colorScheme="red">high</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" spacing="6" mt="1em" display="flex" justifyContent="center">
        <Button colorScheme="blue">Save</Button>
      </ButtonGroup>
      <button onClick={axiosCall}>SUBMIT</button>
    </Container>
  );
}
