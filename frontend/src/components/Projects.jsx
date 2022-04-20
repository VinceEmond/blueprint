import React, { useState, useEffect } from "react";
import { Tr, Td, Heading, useDisclosure, IconButton } from "@chakra-ui/react";
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";
import TrelloProjects from "./Trello/TrelloProjects";
import ProjectTable from "./Tables/ProjectTable";
import ViewSelect from "./ViewSelect";
import ModalForm from "./ModalForm";

export default function Projects() {
  const [userProjects, setUserProjects] = useState([]);
  const [viewValue, setViewValue] = useState("List");
  const [modalState, setModalState] = useState("hide");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        const allProjects = response.data.projects;
        setUserProjects(allProjects);
      })
      .catch((err) => console.log("err:", err));
  }, [viewValue]);

  const projectList = userProjects.map((item) => {
    // converting date data to more readable data
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");

    return (
      <Tr key={item.id}>
        <Td>{item.name}</Td>
        <Td>{item.owner_id}</Td>
        <Td>{date}</Td>
        <Td>{item.status}</Td>
      </Tr>
    );
  });

  function View() {
    if (viewValue === "List") {
      return <ProjectTable projectList={projectList} />;
    } else if (viewValue === "Board") {
      return <TrelloProjects />;
    }
  }

  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Projects
      </Heading>
      <ViewSelect
        setViewValue={setViewValue}
        setModalState={setModalState}
        onOpen={onOpen}
      />
      {View()}
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        modalState={modalState}
        setModalState={setModalState}
        setUserTasks={null}
        setUserProjects={setUserProjects}
      />
    </div>
  );
}
