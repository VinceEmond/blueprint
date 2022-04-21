import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";
import { tasksContext } from "../Providers/TasksProvider";

export default function Tasks() {
  // const [userTasks, setUserTasks] = useState([]);
  const { userTasks } = useContext(tasksContext);
  const [tableRows, setTableRows] = useState([]);
  const { id } = useParams();

  // Retrieve all current project tasks
  useEffect(() => {
    // axios
    //   .get(`/api/projects/${id}/tasks`)
    //   .then((response) => {
    //     const allTasks = response.data.tasks;
    const taskList = userTasks
      .filter((task) => {
        return task.project_id === Number(id);
      })
      .map((item) => {
        // converting date data to more readable data
        let date = moment(item.due_date).utc().format("YYYY-MM-DD");
        return (
          <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.project_id}</Td>
            <Td>{date}</Td>
            <Td>{item.status}</Td>
            <Td>{item.priority}</Td>
          </Tr>
        );
      });
    setTableRows(taskList);
    // })
    // .catch((err) => console.log("err:", err));
  }, [userTasks]);

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Project</Th>
            <Th>Due Date</Th>
            <Th>Status</Th>
            <Th>Priority</Th>
          </Tr>
        </Thead>
        <Tbody>{tableRows}</Tbody>
      </Table>
    </TableContainer>
  );
}
