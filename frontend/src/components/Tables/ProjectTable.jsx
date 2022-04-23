import React, { useContext } from "react";
import { useParams } from "react-router-dom";
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
import axios from "axios";
import moment from "moment";
import { getAssigneeName, updateUserTaskStatus } from "../../helpers/selectors";
// import { viewsContext } from "../../Providers/ViewsProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { tasksContext } from "../../Providers/TasksProvider";

export default function ProjectTable({ onEdit }) {
  const { allUsers } = useContext(usersContext);
  const { userTasks, setUserTasks } = useContext(tasksContext);
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
      // console.log("FILTER: ", task);
      return task.project_id == id;
    })
    .map((item) => {
      // console.log("MAP: ", item);
      // converting date data to more readable data
      let date = moment(item.due_date).utc().format("YYYY-MM-DD");
      let assigneeName = getAssigneeName(item.assignee_id, allUsers);
      // console.log("ALLUSERS: ", allUsers);
      // console.log("ASSIGNEEID: ", item.assignee_id);
      // console.log("OWNERNAME: ", assigneeName);

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

        // updates the project status and returns array of all userProjects with update
        const updatedTasks = updateUserTaskStatus(
          userTasks,
          id,
          e.target.checked
        );
        // console.log("UPDATEDTASKS: ", updatedTasks);

        // filter updated userProjects with status change
        const filteredTask = updatedTasks.filter((project) => {
          return project.id == id;
        });
        // console.log("FILTEREDTASKS: ", filteredTask);

        // console.log(filteredTask[0]);
        // console.log("FILTEREDPROJECT: ", filteredProject);
        // console.log("NEWSTATUS: ", item.status);
        // console.log("NEWITEM: ", item);

        axios.put(`/api/tasks/${id}`, filteredTask[0]).then(() => {
          setUserTasks(updatedTasks);
          // console.log("SUCCESSFUL!");
        });
      }

      return (
        <Tr key={item.id} bg={completeStatusBool}>
          <Td size="sm">
            <CheckboxGroup defaultValue={checkValues}>
              <Checkbox
                ml="2em"
                value={item.name}
                onChange={(e) => checkClick(e, item.id)}
              ></Checkbox>
            </CheckboxGroup>
          </Td>
          <Td onClick={(e) => onEdit(item)}>{item.name}</Td>
          <Td onClick={(e) => onEdit(item)}>{assigneeName}</Td>
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
