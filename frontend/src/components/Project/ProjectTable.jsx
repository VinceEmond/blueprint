import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { getAssigneeName, updateUserTaskStatus } from "../../helpers/selectors";
import { usersContext } from "../../Providers/UsersProvider";
import { tasksContext } from "../../Providers/TasksProvider";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Container,
  Center,
  Td,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

export default function ProjectTable({ onEdit }) {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { allUsers } = useContext(usersContext);
  const { id } = useParams();

  const taskColumn = [
    "Complete",
    "Name",
    "Assignee",
    "Due Date",
    "Status",
    "Priority",
  ];

  const taskHeader = taskColumn.map((column, index) => {
    return <Th key={index}>{column}</Th>;
  });

  const taskList = userTasks
    .filter((task) => {
      return task.project_id == id;
    })
    .map((item) => {
      let date = moment(item.due_date).utc().format("YYYY-MM-DD");
      let assigneeName = getAssigneeName(item.assignee_id, allUsers);

      function defaultChecks() {
        let generatedDefaultValue = [];
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
        const updatedTasks = updateUserTaskStatus(
          userTasks,
          id,
          e.target.checked
        );

        const filteredTask = updatedTasks.filter((project) => {
          return project.id == id;
        });

        axios.put(`/api/tasks/${id}`, filteredTask[0]).then(() => {
          setUserTasks(updatedTasks);
        });
      }

      return (
        <Tr key={item.id} bg={completeStatusBool}>
          <Td size="sm">
            <CheckboxGroup value={checkValues}>
              <Checkbox
                ml="2em"
                value={item.name}
                onChange={(e) => checkClick(e, item.id)}
              ></Checkbox>
            </CheckboxGroup>
          </Td>
          <Td onClick={() => onEdit(item)}>{item.name}</Td>
          <Td onClick={() => onEdit(item)}>{assigneeName}</Td>
          <Td onClick={() => onEdit(item)}>{date}</Td>
          <Td onClick={() => onEdit(item)}>{item.status}</Td>
          <Td onClick={() => onEdit(item)}>{item.priority}</Td>
        </Tr>
      );
    });

  return (
    <Center>
      <Container borderWidth="1px" borderRadius="lg" maxW="8xl">
        <TableContainer>
          <Table size="lg">
            <Thead>
              <Tr>{taskHeader}</Tr>
            </Thead>
            <Tbody>{taskList}</Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Center>
  );
}
