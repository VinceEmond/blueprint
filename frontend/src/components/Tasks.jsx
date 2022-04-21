import React, { useState, useEffect, useContext } from "react";
import {
  Tr,
  Td,
  Heading,
  Checkbox,
  CheckboxGroup,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";
import TrelloTasks from "./Trello/TrelloTasks";
import TaskTable from "./Tables/TaskTable";
import ViewSelect from "./ViewSelect";
import { usersContext } from "../Providers/UsersProvider";
import { getProjectName, updateUserTaskStatus } from "../helpers/selectors";
import ModalForm from "./ModalForm";

export default function Tasks() {
  const [userTasks, setUserTasks] = useState([]);
  const [viewValue, setViewValue] = useState("List");
  const [userProjects, setUserProjects] = useState(null);
  const { currentUser } = useContext(usersContext);
  const [modalState, setModalState] = useState("hide");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Retrieve all projects (eventually user specific projects)
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        const allProjects = response.data.projects;
        setUserProjects(allProjects);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => {
        const allTasks = response.data.tasks;
        setUserTasks(allTasks);
        // console.log(allTasks)
      })
      .catch((err) => console.log("err:", err));
  }, [viewValue]);

  const taskList = userTasks.map((item) => {
    // converting date data to more readable data
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");

    // console.log(`UserProjects: ${userProjects}`);
    // console.log(`item.project_id: ${item.project_id}`);

    let projectName = getProjectName(item.project_id, userProjects);

    let generatedDefaultValue = [];
    function defaultChecks() {
      if (item.status === "Complete") {
        generatedDefaultValue.push(item.name);
      }
      return generatedDefaultValue;
    }
    const checkValues = defaultChecks();

    function completeStatusBool() {
      if (item.status === "Complete") return "grey";
    }

    function checkClick(e, id) {
      console.log("OLDSTATUS: ", item.status);
      console.log("OLDITEM: ", item);
      console.log("CHECKBOX CLICKED", e.target.checked);
      console.log("CHECKBOX EVENT", e);
      console.log("ITEMID CHECK", id);
      const updatedTasks = updateUserTaskStatus(
        userTasks,
        id,
        e.target.checked
      );

      const filteredTasks = updatedTasks.filter((project) => {
        return project.id === id;
      });
      console.log("FILTEREDPROJECT: ", filteredTasks);
      console.log("NEWSTATUS: ", item.status);
      console.log("NEWITEM: ", item);

      axios.put(`/api/tasks/${id}`, filteredTasks[0]).then(() => {
        console.log("SUCCESSFUL!");
        setUserTasks(updatedTasks);
      });
    }

    return (
      // Dylan's temp hack to make sure new task gets unique key
      <Tr key={item.id || item.description.length * 10} bg={completeStatusBool}>
        <Td size="sm">
          <CheckboxGroup defaultValue={checkValues}>
            <Checkbox
              ml="2em"
              value={item.name}
              onChange={(e) => checkClick(e, item.id)}
            ></Checkbox>
          </CheckboxGroup>
        </Td>
        <Td>{item.name}</Td>
        <Td>{projectName}</Td>
        <Td>{date}</Td>
        <Td>{item.status}</Td>
        <Td>{item.priority}</Td>
      </Tr>
    );
  });

  // returns component based on view option
  function View() {
    if (viewValue === "List") {
      return <TaskTable taskList={taskList} />;
    } else if (viewValue === "Board") {
      return <TrelloTasks />;
    }
  }
  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Tasks
      </Heading>
      <ViewSelect
        setViewValue={setViewValue}
        setModalState={setModalState}
        onOpen={onOpen}
        state="tasks"
      />
      {View()}
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        modalState={modalState}
        setModalState={setModalState}
        setUserTasks={setUserTasks}
        setUserProjects={null}
      />
    </div>
  );
}
