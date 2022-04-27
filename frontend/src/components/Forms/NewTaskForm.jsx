import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { tasksContext } from "../../Providers/TasksProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { updateTasks } from "../../helpers/selectors";
import moment from "moment";
import { displayServerError } from "../../helpers/main_helpers";
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

export default function NewTaskForm(props) {
  const NEW_TASK_START_DATE = moment(new Date()).format("YYYY-MM-DD");
  const NEW_TASK_MODIFIED_DATE = moment(new Date()).format("YYYY-MM-DD");
  const NEW_TASK_CATEGORY_ID = 1;
  const NEW_TASK_DESCRIPTION = "";
  const NEW_TASK_STATUS = "Not Started";
  const { cookies } = useContext(usersContext);

  const defaultTaskObj = {
    start_date: NEW_TASK_START_DATE,
    modified_date: NEW_TASK_MODIFIED_DATE,
    category_id: NEW_TASK_CATEGORY_ID,
    description: NEW_TASK_DESCRIPTION,
    assignee_id: cookies.id,
    status: NEW_TASK_STATUS,
  };

  const [taskFormValues, setTaskFormValues] = useState(defaultTaskObj);
  const { setModalState, editTask, setEditTask } = props;
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { userProjects } = useContext(projectsContext);

  function taskFormDataValidation(formValues) {
    const mandatoryFields = [
      "project_id",
      "priority",
      "assignee_id",
      "name",
      "start_date",
      "due_date",
      "modified_date",
      "status",
      "category_id",
    ];

    for (const field of mandatoryFields) {
      if (!formValues[field]) {
        return false;
      }
    }

    return true;
  }

  function createTask(taskFormValues) {
    if (taskFormDataValidation(taskFormValues)) {
      axios
        .post("/api/tasks", taskFormValues)
        .then((response) => {
          const returnedTask = response.data.task[0];
          setUserTasks((prev) => {
            return [...prev, returnedTask];
          });
        })
        .catch((error) => displayServerError(error));
    }
  }

  function updateTask(taskFormValues) {
    axios
      .put(`/api/tasks/${editTask.id}`, taskFormValues)
      .then((response) => {
        const updatedTasks = updateTasks(userTasks, taskFormValues);
        setUserTasks(updatedTasks);
      })
      .catch((error) => displayServerError(error));
  }

  function deleteTask() {
    axios
      .put(`/api/tasks/${editTask.id}/delete`, taskFormValues)
      .then(() => {
        const updatedTasks = userTasks.filter(
          (task) => task.id !== editTask.id
        );
        setUserTasks(updatedTasks);
      })
      .catch((error) => displayServerError(error));
  }

  function handleDelete() {
    deleteTask();
    setModalState(null);
    setEditTask(null);
  }

  function handleNameChange(event) {
    setTaskFormValues({ ...taskFormValues, name: event.target.value });
  }

  function handleStatusChange(event) {
    setTaskFormValues({ ...taskFormValues, status: event.target.value });
  }

  function handleDateChange(event) {
    setTaskFormValues({ ...taskFormValues, due_date: event.target.value });
  }

  function handleDescriptionChange(event) {
    setTaskFormValues({ ...taskFormValues, description: event.target.value });
  }

  function handlePriorityChange(event) {
    setTaskFormValues({ ...taskFormValues, priority: event.target.name });
  }

  function handleProjectIDChange(event) {
    setTaskFormValues({
      ...taskFormValues,
      project_id: Number(event.target.value),
    });
  }

  function handleAssigneeChange(event) {
    setTaskFormValues({
      ...taskFormValues,
      assignee_id: Number(event.target.value),
    });
  }

  function handleSave() {
    if (editTask) {
      updateTask(taskFormValues);
    } else {
      createTask(taskFormValues);
    }
    setModalState(null);
    setEditTask(null);
  }

  useEffect(() => {
    if (editTask) {
      setTaskFormValues({
        ...editTask,
        due_date: editTask.due_date.slice(0, 10),
        modified_date: editTask.modified_date.slice(0, 10),
        start_date: editTask.start_date.slice(0, 10),
      });
    }
  }, [editTask]);

  return (
    <div>
      <Container>
        <HStack mt="1em">
          <Editable
            width="70%"
            display="flex"
            alignItems="left"
            placeholder="Task name here..."
            value={taskFormValues.name}
          >
            <EditablePreview display="flex" width="full" />
            <EditableInput
              display="flex"
              onChange={(e) => handleNameChange(e)}
            />
          </Editable>
          <Select
            value={taskFormValues.status || "Not Started"}
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
          <p>Project:</p>
          <Select
            placeholder="Select Project"
            width="60%"
            display="flex"
            onChange={(e) => handleProjectIDChange(e)}
            value={taskFormValues.project_id}
          >
            {userProjects.map((project) => {
              return (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              );
            })}
          </Select>
        </HStack>

        <HStack mt="1em">
          <p>Assignee: </p>
          <Select
            placeholder="Select Assignee"
            width="60%"
            display="flex"
            onChange={(e) => handleAssigneeChange(e)}
            value={taskFormValues.assignee_id}
          >
            <option value={1}>Dylan</option>
            <option value={2}>Pablo</option>
            <option value={3}>Vince</option>
          </Select>
        </HStack>
        <HStack mt="1em">
          <p>Due Date: </p>
          <Input
            type="date"
            width="60%"
            value={taskFormValues.due_date || ""}
            onChange={(e) => handleDateChange(e)}
          />
        </HStack>
        <Textarea
          mt="1em"
          placeholder="Description here..."
          value={taskFormValues.description}
          onChange={(e) => handleDescriptionChange(e)}
        />
        <ButtonGroup
          variant="outline"
          spacing="6"
          mt="1em"
          display="flex"
          justifyContent="center"
          padding="10px"
        >
          <Button
            colorScheme="green"
            name="Low"
            onClick={(e) => handlePriorityChange(e)}
            width="100px"
            _hover={{
              background: "rgba(4, 94, 28,1)",
              color: "white",
            }}
            _active={{
              background: "rgba(4, 94, 28,1)",
              color: "white",
            }}
            _focus={{
              background: "rgba(4, 94, 28,1)",
              color: "white",
            }}
          >
            low
          </Button>
          <Button
            colorScheme="yellow"
            name="Medium"
            onClick={(e) => handlePriorityChange(e)}
            width="100px"
            _hover={{
              background: "rgb(184, 123, 11)",
              color: "white",
            }}
            _active={{
              background: "rgb(184, 123, 11)",
              color: "white",
            }}
            _focus={{
              background: "rgb(184, 123, 11)",
              color: "white",
            }}
          >
            medium
          </Button>
          <Button
            colorScheme="red"
            name="High"
            onClick={(e) => handlePriorityChange(e)}
            width="100px"
            _hover={{
              background: "rgb(171, 31, 12)",
              color: "white",
            }}
            _active={{
              background: "rgb(171, 31, 12)",
              color: "white",
            }}
            _focus={{
              background: "rgb(171, 31, 12)",
              color: "white",
            }}
          >
            high
          </Button>
        </ButtonGroup>
        <ButtonGroup
          paddingTop="15px"
          spacing="6"
          mt="1em"
          display="flex"
          justifyContent="center"
        >
          {editTask && (
            <Button
              colorScheme="red"
              onClick={(e) => handleDelete(e)}
              width="200px"
            >
              Delete
            </Button>
          )}
          <Button colorScheme="teal" onClick={() => handleSave()} width="200px">
            Save
          </Button>
        </ButtonGroup>
      </Container>
    </div>
  );
}
