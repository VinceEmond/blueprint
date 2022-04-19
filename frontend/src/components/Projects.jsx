import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";
import ViewSelect from "./ViewSelect";
import TrelloProjects from "./Trello/TrelloProjects";

export default function Projects() {
  const [userProjects, setUserProjects] = useState(null);
  const [viewValue, setViewValue] = useState("List");

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        const userProjects = response.data.projects;
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
        setUserProjects(projectList);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  function View() {
    if (viewValue === "List") {
      return (
        <TableContainer>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Owner</Th>
                <Th>Due Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>{userProjects}</Tbody>
          </Table>
        </TableContainer>
      );
    } else if (viewValue === "Board") {
      return <TrelloProjects />;
    }
  }

  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Projects
      </Heading>
      <ViewSelect setViewValue={setViewValue} />
      {View()}
    </div>
  );
}
