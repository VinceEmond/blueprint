import React, { useState, useEffect } from "react";
import { Tr, Td, Heading, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";
import TrelloTasks from "./Trello/TrelloTasks";
import TaskTable from "./Tables/TaskTable";
import ViewSelect from "./ViewSelect";
import ModalForm from "./ModalForm";
import { getProjectName } from "../helpers/selectors";

export default function Tasks() {
  const [userTasks, setUserTasks] = useState([]);
  const [viewValue, setViewValue] = useState("List");
  const [modalState, setModalState] = useState("hide");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userProjects, setUserProjects] = useState(null);

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

    let projectName = getProjectName(item.project_id, userProjects);

    return (
      <Tr key={item.id}>
        <Td>{item.name}</Td>
        <Td>{projectName}</Td>
        <Td>{date}</Td>
        <Td>{item.status}</Td>
        <Td>{item.priority}</Td>
      </Tr>
    );
  });

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
