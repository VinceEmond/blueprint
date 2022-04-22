import { useRef, useContext, useState, useEffect } from "react";
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
import { projectsContext } from "../Providers/ProjectsProvider";
import { updateProjects } from "../helpers/selectors";

export default function NewProjectForm(props) {
  const testProjectValues = {
    owner_id: 1,
    name: "New 69 Project",
    description: "Test Project Description Herrreeeeeasdasd",
    start_date: "1969-04-20",
    due_date: "1969-04-20",
    modified_date: "2022-04-15",
    status: "Not Started",
    category_id: 1,
  };

  const [projectFormValues, setProjectFormValues] = useState(testProjectValues);
  const { setModalState, editProject, setEditProject } = props;
  const initialRef = useRef();
  const { userProjects, setUserProjects } = useContext(projectsContext);

  function createProject(projectFormValues) {
    if (!editProject) {
      axios
        .post("/api/projects", projectFormValues)
        .then((response) => {
          setUserProjects((prev) => [...prev, projectFormValues]);
          console.log("Succesfully added a new Project to database");
        })
        .catch((err) => console.log("err:", err));
    } else {
      axios
        .put(`/api/projects/${editProject.id}`, projectFormValues)
        .then((response) => {
          const updatedProjects = updateProjects(
            userProjects,
            projectFormValues
          );
          console.log(updatedProjects);
          setUserProjects(updatedProjects);
          console.log("Succesfully added a new Project to database");
        })
        .catch((err) => console.log("err:", err));
    }
    console.log(`Userprojects after put request: ${userProjects}`);
  }

  function handleProjectChange(event) {
    setProjectFormValues({ ...projectFormValues, name: event.target.value });
  }
  function handleOwnerChange(event) {
    setProjectFormValues({
      ...projectFormValues,
      owner_id: Number(event.target.value),
    });
  }
  function handleStatusChange(event) {
    setProjectFormValues({ ...projectFormValues, status: event.target.value });
  }
  function handleDateChange(event) {
    setProjectFormValues({
      ...projectFormValues,
      due_date: event.target.value,
    });
  }
  function handleDescriptionChange(event) {
    setProjectFormValues({
      ...projectFormValues,
      description: event.target.value,
    });
  }

  function handleSave(event) {
    // console.log('projectFormValues', projectFormValues);
    createProject(projectFormValues);
    setModalState(null);
    setEditProject(null);
  }

  useEffect(() => {
    if (editProject) {
      setProjectFormValues({
        ...editProject,
        due_date: editProject.due_date.slice(0, 10),
        modified_date: editProject.modified_date.slice(0, 10),
        start_date: editProject.start_date.slice(0, 10),
      });
    }
  }, [editProject]);

  return (
    <Container>
      <HStack mt="1em">
        <Editable
          width="70%"
          display="flex"
          alignItems="left"
          placeholder="Project name here..."
          value={projectFormValues.name}
        >
          <EditablePreview display="flex" width="full" />
          <EditableInput
            display="flex"
            onChange={(e) => handleProjectChange(e)}
            ref={initialRef}
          />
        </Editable>

        <Select
          // placeholder="Select Status"
          value={projectFormValues.status || "Not Started"}
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
        <p>Owner:</p>
        <Select
          placeholder="Select Owner"
          width="60%"
          display="flex"
          onChange={(e) => handleOwnerChange(e)}
          value={projectFormValues.owner_id}
        >
          <option value="1">Dylan</option>
          <option value="2">Pablo</option>
          <option value="3">Vince</option>
        </Select>
      </HStack>

      <HStack mt="1em">
        <p>Due Date: </p>
        <Input
          type="date"
          width="60%"
          value={projectFormValues.due_date || ""}
          onChange={(e) => handleDateChange(e)}
        />
      </HStack>

      <HStack mt="1em">
        <Textarea
          mt="1em"
          placeholder="Description here..."
          value={projectFormValues.description}
          onChange={(e) => handleDescriptionChange(e)}
        />
      </HStack>

      <ButtonGroup
        paddingTop="15px"
        spacing="6"
        mt="1em"
        display="flex"
        justifyContent="center"
      >
        <Button colorScheme="blue" onClick={(e) => handleSave(e)} width="200px">
          Save
        </Button>
      </ButtonGroup>
    </Container>
  );
}
