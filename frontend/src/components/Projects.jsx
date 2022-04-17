import React, { useState,useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";



export default function Projects() {
  const [userProjects, setUserProjects] = useState([]);
  let loading = false;

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    if (!loading) {
      loading = true;
      axios
        .get("/api/projects")
        .then((response) => {
          const userProjects = response.data.projects;
          setUserProjects(userProjects);
          console.log(userProjects)
        })
        .catch((err) => console.log("err:", err));
    }
  }, []);


  const projectList = userProjects.map((item) => {
    // converting date data to more readable data
    let date = moment(item.due_date).utc().format('YYYY-MM-DD')

    return (
    <Tr key={item.id}>
    <Td>{item.name}</Td>
    <Td>{item.owner_id}</Td>
    <Td>{date}</Td>
    <Td>{item.status}</Td>
  </Tr>)
  });

  return <TableContainer>
  <Table variant='striped' colorScheme='blue'>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Owner</Th>
        <Th>Due Date</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
  {projectList}
    </Tbody>

  </Table>
</TableContainer>
}
