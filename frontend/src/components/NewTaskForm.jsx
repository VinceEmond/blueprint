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
  // const [formValue, setFormValue] = React.useState(null);
  const [taskFormValues, setTaskFormValues] = React.useState({});
  
  // {project_id: 1, priority: "Low", assignee_id: 1, name: "Plant Seeds", description: "I need to plant seeds", start_date: '1969-04-20', due_date: '1969-04-20', modified_date: '2022-04-15', status: 'Not Started', category_id: 1}
  function createTask(taskFormValues) {
        axios
          .post('/api/tasks', taskFormValues)
          .then((response) => {
            console.log("Succesfully added new Task to database")
          })
          .catch((err) => console.log("err:", err));
  } 
  
function handleNameChange(event) {setTaskFormValues({...taskFormValues, name: event.target.value})}
function handleStatusChange(event) {setTaskFormValues({...taskFormValues, status: event.target.value})}
function handleProjectIDChange(event) {setTaskFormValues({...taskFormValues, project_id: event.target.value})}
function handleAssigneeChange(event) {setTaskFormValues({...taskFormValues, assignee_id: event.target.value})}
function handleDateChange(event) {setTaskFormValues({...taskFormValues, due_date: event.target.value})}
function handleDescriptionChange(event) {setTaskFormValues({...taskFormValues, description: event.target.value})}
function handlPriorityChange(event) {setTaskFormValues({...taskFormValues, priority: event.target.value})}  

function handleSave(event){
  console.log('task name: ', taskFormValues.name);
  console.log('status: ', taskFormValues.status)
  console.log('project_id: ', taskFormValues.project_id)
  console.log('assignee: ', taskFormValues.assignee_id)
  console.log('date: ',taskFormValues.due_date)
  console.log('description: ', taskFormValues.description)
  console.log('priority: ', taskFormValues.priority)

}

  return (
    <Container mt="4em">
      <HStack mt="1em">
        <Editable
          width="70%"
          display="flex"
          alignItems="left"
          placeholder="Task name here..."
          value={taskFormValues.name}
        >
          <EditablePreview display="flex" width="full"/>
          <EditableInput display="flex" onChange={(e) => handleNameChange(e)}/>
        </Editable>
        <Select placeholder="Select Status" width="40%" display="flex">
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
        <Button colorScheme="blue" onClick={(e)=>{handleSave(e)}}>Save</Button>
      </ButtonGroup>
    </Container>
  );
}
