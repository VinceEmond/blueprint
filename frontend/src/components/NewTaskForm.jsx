import React, { useEffect, useState } from "react";
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
} from '@chakra-ui/react';
import axios from 'axios';

export default function NewTaskForm(props) {

  // const testTaskValues = {
  //   name: "New 69 Task",
  //   priority: 'low',
  //   status: 'Complete',
  //   description: "Tasks description 420 69",
  //   start_date: '1969-04-20',
  //   due_date: '1969-04-20',
  //   modified_date: '2022-04-15',
  //   category_id: 1
  // }

  const arrayOfUserNames = ['Vince','Dylan', 'Pablo'];

  const [taskFormValues, setTaskFormValues] = React.useState({
          start_date: '2000-01-01',
          modified_date: '2022-04-18', 
          category_id: 1
  });
  const {setModalState} = props;

  // {project_id: 1, priority: "Low", assignee_id: 1, name: "Plant Seeds", description: "I need to plant seeds", start_date: '1969-04-20', due_date: '1969-04-20', modified_date: '2022-04-15', status: 'Not Started', category_id: 1}
  function createTask(taskFormValues) {
        axios
          .post('/api/tasks', taskFormValues)
          .then((response) => {
            console.log("Succesfully added a new Task to database")
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
  // console.log('taskFormValues', taskFormValues);
  createTask(taskFormValues);
  setModalState(null);
}

  return (
    <Container>
      <HStack mt="1em">
        <Editable
          width="70%"
          display="flex"
          alignItems="left"
          placeholder="Task name here..."
          value={taskFormValues.name}>
          <EditablePreview display="flex" width="full" />
          <EditableInput display="flex" onChange={(e) => handleNameChange(e)} />
        </Editable>
        <Select
          // placeholder="Select Status"
          value={taskFormValues.status || 'Not Started'}
          width="40%"
          display="flex"
          onChange={(e) => handleStatusChange(e)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </Select>
      </HStack>

      <HStack mt="1em">
        <p>Project:</p>
        <Select 
          placeholder="Select Project" 
          // value={'Not Started'} 
          width="60%" 
          display="flex" 
          onChange={(e) => handleProjectIDChange(e)}
          >
          <option value='1'>Project 1</option>
          <option value='2'>Project 2</option>
          <option value='3'>Project 3</option>
        </Select>
      </HStack>

      <HStack mt="1em">
        <p>Assignee:  </p>
        <Select 
        placeholder="Select Assignee" 
        // value={'Not Started'} 
        width="60%" 
        display="flex" 
        onChange={(e) => handleAssigneeChange(e)}
        >
        <option value='1'>Dylan</option>
        <option value='2'>Pablo</option>
        <option value='3'>Vince</option>
        </Select>
      </HStack>
      <HStack mt="1em">
        <p>Due Date: </p>
        <Input
          type="date"
          width="60%"
          value={taskFormValues.due_date || ''}
          onChange={(e) => handleDateChange(e)}
        />
      </HStack>
      <Textarea
        mt="1em"
        placeholder="Description here..."
        value={taskFormValues.description}
        onChange={(e) => handleDescriptionChange(e)}
      />
      <ButtonGroup variant="outline" spacing="6" mt="1em" display="flex" justifyContent="center" padding='10px'>
        <Button colorScheme="green" name='Low' onClick={(e)=> handlePriorityChange(e)} width='100px'>low</Button>
        <Button colorScheme="yellow" name='Medium' onClick={(e)=> handlePriorityChange(e)} width='100px'>medium</Button>
        <Button colorScheme="red" name='High' onClick={(e)=> handlePriorityChange(e)} width='100px'>high</Button>
      </ButtonGroup>
      <ButtonGroup paddingTop='15px' spacing="6" mt="1em"  display="flex" justifyContent="center">
        <Button colorScheme="blue" onClick={(e)=>handleSave(e)} width='200px'>Save</Button>
      </ButtonGroup>
    </Container>
  );
}
