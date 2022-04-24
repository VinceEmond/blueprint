import React, { useContext, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Center,
  Container,
  Td,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { getProjectName, updateUserTaskStatus } from "../../helpers/selectors";
import { tasksContext } from "../../Providers/TasksProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";

export default function TasksTable({ onEdit }) {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { userProjects } = useContext(projectsContext);

  const taskColumn = [
    "Complete",
    "Name",
    "Project Name",
    "Due Date",
    "Status",
    "Priority",
  ];

  const taskHeader = taskColumn.map((column, index) => {
    return <Th key={`${index}${column}`}>{column}</Th>;
  });

  const taskList = userTasks.map((item) => {
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");

    let projectName = getProjectName(item.project_id, userProjects);

    // consider moving to helper function file
    function defaultChecks() {
      let generatedDefaultValue = [];
      if (item.status === "Complete") {
        generatedDefaultValue.push(item.name);
      }
      return generatedDefaultValue;
    }
    const checkValues = defaultChecks();

    // consider moving to helper function file
    function completeStatusBool() {
      if (item.status === "Complete") return "grey";
    }

    // consider moving to helper function file
    function checkClick(e, id) {
      const updatedTasks = updateUserTaskStatus(
        userTasks,
        id,
        e.target.checked
      );

      const filteredTasks = updatedTasks.filter((project) => {
        return project.id === id;
      });

      axios.put(`/api/tasks/${id}`, filteredTasks[0]).then(() => {
        setUserTasks(updatedTasks);
      });
    }

    return (
      <Tr key={item.id || item.description.length * 10} bg={completeStatusBool}>
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
        <Td onClick={() => onEdit(item)}>
          {projectName ? projectName : "Uncategorized"}
        </Td>
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
