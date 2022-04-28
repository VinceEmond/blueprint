import { useRef, useContext, useState, useEffect } from "react";
import axios from "axios";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { updateProjects } from "../../helpers/selectors";
import { usersContext } from "../../Providers/UsersProvider";
import moment from "moment";
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

export default function NewProjectForm(props) {
  const initialRef = useRef();
  const { setModalState, editProject, setEditProject } = props;
  const { cookies } = useContext(usersContext);
  const { userProjects, setUserProjects } = useContext(projectsContext);

  const defaultProjectValues = {
    owner_id: Number(cookies.id),
    name: "",
    description: "",
    start_date: moment(new Date()).format("YYYY-MM-DD"),
    due_date: moment(new Date()).add(7, "days").format("YYYY-MM-DD"),
    modified_date: moment(new Date()).format("YYYY-MM-DD"),
    status: "Not Started",
    category_id: 1,
  };

  const [projectFormValues, setProjectFormValues] =
    useState(defaultProjectValues);

  function projectFormDataValidation(formValues) {
    const mandatoryFields = ["name", "owner_id"];

    for (const key of mandatoryFields) {
      if (!formValues[key]) {
        return false;
      }
    }
    return true;
  }

  function createProject(projectFormValues) {
    if (projectFormDataValidation(projectFormValues)) {
      axios
        .post("/api/projects", projectFormValues)
        .then((response) => {
          const returnedProject = response.data.project[0];
          setUserProjects((prev) => [...prev, returnedProject]);
        })
        .catch((err) => console.log("err:", err));
    } else {
      console.log("Invalid Data in form!");
    }
  }

  function updateProject(projectFormValues) {
    if (projectFormDataValidation(projectFormValues)) {
      axios
        .put(`/api/projects/${editProject.id}`, projectFormValues)
        .then((response) => {
          const updatedProjects = updateProjects(
            userProjects,
            projectFormValues
          );
          setUserProjects(updatedProjects);
        })
        .catch((err) => console.log("err:", err));
    } else {
      console.log("Invalid Data in form!");
    }
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

  function deleteProject() {
    axios
      .put(`/api/projects/${editProject.id}/delete`, projectFormValues)
      .then((response) => {
        const updatedProjects = userProjects.filter(
          (project) => project.id !== editProject.id
        );
        setUserProjects(updatedProjects);
      })
      .catch((err) => console.log("err:", err));
  }

  function handleDelete(event) {
    console.log("Delete button clicked");
    deleteProject();
    setModalState(null);
    setEditProject(null);
  }

  function handleSave(e) {
    if (editProject) {
      updateProject(projectFormValues);
    } else {
      createProject(projectFormValues);
    }
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
          value={projectFormValues.status || "Not Started"}
          width="42%"
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
        {editProject && (
          <Button
            colorScheme="red"
            onClick={(e) => handleDelete(e)}
            width="200px"
          >
            Delete
          </Button>
        )}
        <Button colorScheme="teal" onClick={(e) => handleSave(e)} width="200px">
          Save
        </Button>
      </ButtonGroup>
    </Container>
  );
}
