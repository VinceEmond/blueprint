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
import { usersContext } from "../../Providers/UsersProvider";
import { tasksContext } from "../../Providers/TasksProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";

export default function TaskTable({ onEdit }) {
  // const { taskList } = props;
  const taskColumn = [
    "Complete",
    "Name",
    "Project Name",
    "Due Date",
    "Status",
    "Priority",
  ];

  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { allUsers } = useContext(usersContext);
  const { userProjects } = useContext(projectsContext);

  const taskHeader = taskColumn.map((column, index) => {
    return <Th key={`${index}${column}`}>{column}</Th>;
  });

  const taskList = userTasks.map((item) => {
    // converting date data to more readable data
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");
    // console.log(`UserProjects: ${userProjects}`);
    // console.log(`item.project_id: ${item.project_id}`);

    let projectName = getProjectName(item.project_id, userProjects);

    let generatedDefaultValue = [];
    function defaultChecks() {
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
      // console.log("OLDSTATUS: ", item.status);
      // console.log("OLDITEM: ", item);
      // console.log("CHECKBOX CLICKED", e.target.checked);
      // console.log("CHECKBOX EVENT", e);
      // console.log("ITEMID CHECK", id);
      const updatedTasks = updateUserTaskStatus(
        userTasks,
        id,
        e.target.checked
      );

      const filteredTasks = updatedTasks.filter((project) => {
        return project.id === id;
      });
      // console.log("FILTEREDPROJECT: ", filteredTasks);
      // console.log("NEWSTATUS: ", item.status);
      // console.log("NEWITEM: ", item);

      axios.put(`/api/tasks/${id}`, filteredTasks[0]).then(() => {
        // console.log("SUCCESSFUL!");
        setUserTasks(updatedTasks);
      });
    }

    return (
      // Dylan's temp hack to make sure new task gets unique key
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
        <Td onClick={(e) => onEdit(item)}>{item.name}</Td>
        <Td onClick={(e) => onEdit(item)}>{projectName}</Td>
        <Td onClick={(e) => onEdit(item)}>{date}</Td>
        <Td onClick={(e) => onEdit(item)}>{item.status}</Td>
        <Td onClick={(e) => onEdit(item)}>{item.priority}</Td>
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
