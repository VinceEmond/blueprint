import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import axios from 'axios';
// package that allows conversion of date data
import moment from 'moment';
export default function Tasks() {
  const [userTasks, setUserTasks] = useState([]);
  let loading = false;

  const { id } = useParams();
  console.log(`THE ID IS: ${id}`);

  // Retrieve all current project tasks
  useEffect(() => {
    if (!loading) {
      loading = true;
      axios
        .get(`/api/projects/${id}/tasks`)
        .then((response) => {
          console.log(response);
          const allTasks = response.data.tasks;
          const taskList = allTasks.map((item) => {
            // converting date data to more readable data
            let date = moment(item.due_date).utc().format('YYYY-MM-DD');

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
          setUserTasks(taskList);
          console.log(allTasks);
        })
        .catch((err) => console.log('err:', err));
    }
  }, []);

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
        <Tbody>{userTasks}</Tbody>
      </Table>
    </TableContainer>
  );
}
