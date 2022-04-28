import React, { useContext } from "react";
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
import {
  getProjectName,
  updateUserTaskStatus,
  getAssigneeName,
} from "../../helpers/selectors";
import { tasksContext } from "../../Providers/TasksProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { usersContext } from "../../Providers/UsersProvider";

export default function TasksTable({ onEdit }) {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { userProjects } = useContext(projectsContext);
  const { allUsers } = useContext(usersContext);

  const taskColumn = [
    "Complete",
    "Task Name",
    "Assignee",
    "Project Name",
    "Due Date",
    "Status",
    "Priority",
  ];

  const taskHeader = taskColumn.map((column, index) => {
    return (
      <Th
        key={`${index}${column}`}
        style={{ color: "white", backgroundColor: "transparent" }}
      >
        {column}
      </Th>
    );
  });

  const taskList = userTasks.map((item) => {
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");
    let assigneeName = getAssigneeName(item.assignee_id, allUsers);
    let projectName = getProjectName(item.project_id, userProjects);

    function defaultChecks() {
      let generatedDefaultValue = [];
      if (item.status === "Complete") {
        generatedDefaultValue.push(item.name);
      }
      return generatedDefaultValue;
    }
    const checkValues = defaultChecks();

    function completeStatusBool() {
      if (item.status === "Complete") return "#03403A";
    }

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
      <Tr
        key={item.id || item.description.length * 10}
        bg={completeStatusBool}
        _hover={{
          backgroundColor: "rgba(3, 140, 140, 0.3)",
          cursor: "pointer",
        }}
      >
        <Td size="sm">
          <CheckboxGroup value={checkValues}>
            <Checkbox
              ml="2em"
              value={item.name}
              onChange={(e) => checkClick(e, item.id)}
              colorScheme="yellow"
            ></Checkbox>
          </CheckboxGroup>
        </Td>
        <Td
          onClick={() => onEdit(item)}
          maxWidth={"290px"}
          style={{ color: "white" }}
        >
          {item.name}
        </Td>
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {assigneeName}
        </Td>
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {projectName ? projectName : "Uncategorized"}
        </Td>
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {date}
        </Td>
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {item.status}
        </Td>
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {item.priority}
        </Td>
      </Tr>
    );
  });
  return (
    <Center>
      <Container
        borderWidth="1px"
        borderRadius="lg"
        maxW="8xl"
        style={{
          backgroundColor: "transparent",
          border: "solid white 2px",
        }}
      >
        <TableContainer>
          <Table
            size="lg"
            style={{
              backgroundColor: "rgba(10,23,30,0.8)",
              marginBottom: "1em",
            }}
          >
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
