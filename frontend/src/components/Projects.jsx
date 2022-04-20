import React, { useState, useEffect } from "react";
import { Tr, Td, Heading, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";
import TrelloProjects from "./Trello/TrelloProjects";
import ProjectTable from "./Tables/ProjectTable";
import ViewSelect from "./ViewSelect";
import ModalForm from "./ModalForm";
import { getProjectOwnerName } from "../helpers/selectors";

export default function Projects() {
  const [userProjects, setUserProjects] = useState([]);
  const [viewValue, setViewValue] = useState("List");
  const [modalState, setModalState] = useState("hide");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState(null);

  // When mounted, API call for DB query for all users and specific user's name when component renders
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/users")
      .then((response) => {
        const allUsers = response.data.users;
        setUserData(allUsers);
        // console.log("ALLUSERS: ", allUsers);

        return () => {
          controller.abort();
        };
      })
      .catch((err) => console.log("err:", err));
  }, []);

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        const allProjects = response.data.projects;
        setUserProjects(allProjects);
        // console.log("ALLPROJECTS: ", allProjects);
      })
      .catch((err) => console.log("err:", err));
  }, [viewValue]);

  const projectList = userProjects.map((item) => {
    // converting date data to more readable data
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");
    // console.log("OWNERID: ", item.owner_id);
    // console.log("USERDATA:", userData);
    let ownerName = getProjectOwnerName(item.owner_id, userData);
    return (
      // Temporary hack for freshly added projects without database id (until page refresh)
      <Tr key={item.id || item.description.length * 10}>
        <Td>{item.name}</Td>
        <Td>{ownerName}</Td>
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
        state="projects"
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
