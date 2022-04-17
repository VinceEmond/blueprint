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



export default function Tasks() {
  const [userTasks, setUserTasks] = useState([]);
  let loading = false;

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    if (!loading) {
      loading = true;
      axios
        .get("/api/tasks")
        .then((response) => {
          const allTasks = response.data.tasks;
          setUserTasks(allTasks);
          console.log(allTasks)
        })
        .catch((err) => console.log("err:", err));
    }
  }, []);


  const taskList = userTasks.map((item) => {
    // converting date data to more readable data
    let date = moment(item.due_date).utc().format('YYYY-MM-DD')

    return (
    <Tr key={item.id}>
    <Td>{item.name}</Td>
    <Td>{item.project_id}</Td>
    <Td>{date}</Td>
    <Td>{item.status}</Td>
    <Td>{item.priority}</Td>
  </Tr>)
  });

  return <TableContainer>
  <Table variant='striped' colorScheme='blue'>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Project</Th>
        <Th>Due Date</Th>
        <Th>Status</Th>
        <Th>Priority</Th>
      </Tr>
    </Thead>
    <Tbody>
  {taskList}
    </Tbody>

  </Table>
</TableContainer>
}
