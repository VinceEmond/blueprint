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
  Input,
} from "@chakra-ui/react";
import axios from "axios";

export default function NewTaskForm() {
  // const [formValue, setFormValue] = React.useState(null);
  const [taskFormValues, setTaskFormValues] = React.useState({});
  
  const testTaskValues = {
    name: "New 69 Task", 
    priority: 'low',
    status: 'Complete', 
    description: "Tasks description 420 69", 
    start_date: '1969-04-20', 
    due_date: '1969-04-20', 
    modified_date: '2022-04-15', 
    category_id: 1
  }

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
function handlePriorityChange(event) {setTaskFormValues({...taskFormValues, priority: event.target.name})}  

function handleSave(event){
  console.log('task name: ', taskFormValues.name);
  console.log('status: ', taskFormValues.status)
  console.log('project_id: ', taskFormValues.project_id)
  console.log('assignee: ', taskFormValues.assignee_id)
  console.log('date: ',taskFormValues.due_date)
  console.log('description: ', taskFormValues.description)
  console.log('priority: ', taskFormValues.priority)

  // createTask(taskFormValues);
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
        <Select 
          // placeholder="Select Status" 
          value={taskFormValues.status || 'Not Started'} 
          width="40%" 
          display="flex" 
          onChange={(e) => handleStatusChange(e)}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </Select>
      </HStack>
      <HStack mt="1em">
        <Editable 
          width="80%" 
          display="flex"
          placeholder="Project ID here..."
          value={taskFormValues.project_id}
        >
          <EditablePreview width="full" />
          <EditableInput onChange={(e) => handleProjectIDChange(e)}></EditableInput>
        </Editable>
      </HStack>
      <HStack mt="1em">
        <p>Assignee:  </p>
        <Editable 
          width="80%" 
          display="flex"
          placeholder="Assignee ID here..."
          value={taskFormValues.assignee_id}
        >
          <EditablePreview width="full" />
          <EditableInput onChange={(e) => handleAssigneeChange(e)}></EditableInput>
        </Editable>
      </HStack>
      <HStack mt="1em">
        <p>Due Date: </p>
        <Input 
          type="date" 
          width="60%" 
          value={taskFormValues.due_date}
          onChange={(e)=>handleDateChange(e)}
        />
      </HStack>
      <Textarea
        mt="1em" 
        placeholder="Description here..." 
        value={taskFormValues.description} 
        onChange={(e) => handleDescriptionChange(e)}
      />
      <ButtonGroup variant="outline" spacing="6" mt="1em" display="flex" justifyContent="center">
        <Button colorScheme="green" name='low' onClick={(e)=> handlePriorityChange(e)}>low</Button>
        <Button colorScheme="yellow" name='medium' onClick={(e)=> handlePriorityChange(e)}>medium</Button>
        <Button colorScheme="red" name='high' onClick={(e)=> handlePriorityChange(e)}>high</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" spacing="6" mt="1em"  display="flex">
        <Button colorScheme="blue" onClick={(e)=>handleSave(e)}>Save</Button>
      </ButtonGroup>
    </Container>
  );
}
