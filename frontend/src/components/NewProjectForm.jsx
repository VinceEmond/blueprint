import React, { useEffect } from "react";
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
  Input
} from "@chakra-ui/react";
import axios from "axios";

const NewProjectForm = () => {

  const [projectFormValues, setProjectFormValues] = React.useState({
    owner_id: 1, 
    name: "New 69 Project", 
    description: "Test Project Description Herrreeeee", 
    start_date: '1969-04-20', 
    due_date: '1969-04-20', 
    modified_date: '2022-04-15', 
    status: 'Not Started', 
    category_id: 1
  });

  // const [projectFormValues, setProjectFormValues] = React.useState({
  //   owner_id: "", 
  //   name: "", 
  //   description: "", 
  //   start_date: '', 
  //   due_date: '', 
  //   modified_date: '', 
  //   status: '', 
  //   category_id: 1
  // });

  function createProject(projectFormValues) {
    axios
    .post('/api/projects', projectFormValues)
    .then((response) => {
      console.log("Succesfully added Project to database")
      console.log("Response", response.data)
    })
    .catch((err) => console.log("err:", err));
  }
  
  // let loading = false;
  // useEffect(() => {
  //   if (!loading) {
  //     loading = true;
  //   console.log("Set Project Form Values", projectFormValues.name)
  //   }
  // }, [])

  function handleProjectChange(event) {setProjectFormValues({...projectFormValues, name: event.target.value})}
  function handleOwnerChange(event) {setProjectFormValues({...projectFormValues, owner_id: event.target.value})}
  function handleStatusChange(event) {setProjectFormValues({...projectFormValues, status: event.target.value})}
  function handleDateChange(event) {setProjectFormValues({...projectFormValues, due_date: event.target.value})}
  function handleDescriptionChange(event) {setProjectFormValues({...projectFormValues, description: event.target.value})}
  
  function handleSave(event){
    console.log('project: ', projectFormValues.name);
    console.log('owner: ', projectFormValues.owner_id)
    console.log('status: ', projectFormValues.status)
    console.log('date: ',projectFormValues.due_date)
    console.log('description: ', projectFormValues.description)
    // Validation happens here
    createProject(projectFormValues)
  }

  return (
    <Container mt="4em">
      <HStack mt="1em">
        <Editable
          width="70%"
          display="flex"
          alignItems="left"
          placeholder="Project name here..."
          value={projectFormValues.name}
        >
          <EditablePreview display="flex" width="full"/>
          <EditableInput display="flex" onChange={(e) => handleProjectChange(e)}/>
        </Editable>
        <Select placeholder="Select Status" value={projectFormValues.status} width="30%" display="flex" onChange={(e) => handleStatusChange(e)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </Select>
      </HStack>
      <HStack mt="1em">
        <p>Owner: </p>
        <Editable 
          width="80%" 
          display="flex"
          placeholder="Owner name here..."
          value={projectFormValues.owner_id}
        >
          <EditablePreview width="full" />
          <EditableInput onChange={(e) => handleOwnerChange(e)}></EditableInput>
        </Editable>
      </HStack>

      <HStack mt="1em">
        <p>Due Date: </p>
        <Input type="date" value={projectFormValues.due_date} onChange={(e) => handleDateChange(e)}/>
      </HStack>
      <Textarea mt="1em" placeholder="Description here..." value={projectFormValues.description} onChange={(e) => handleDescriptionChange(e)}/>

      <ButtonGroup variant="outline" spacing="6" mt="1em">
        <Button colorScheme="blue" onClick={(e)=>handleSave(e)}>Save</Button>
      </ButtonGroup>
    </Container>
  );
}

export default NewProjectForm;