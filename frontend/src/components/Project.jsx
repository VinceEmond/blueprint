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
  Center,
  Container,
  CheckboxGroup,
  Checkbox,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
// package that allows conversion of date data
import moment from "moment";
import { tasksContext } from "../Providers/TasksProvider";
import { projectsContext } from "../Providers/ProjectsProvider";
import { usersContext } from "../Providers/UsersProvider";
import {
  updateUserProjectStatus,
  getProjectName,
  getProjectOwnerName,
  updateUserTaskStatus,
} from "../helpers/selectors";

export default function Tasks() {
  // const [userTasks, setUserTasks] = useState([]);
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { userProjects, setUserProjects } = useContext(projectsContext);
  const [tableRows, setTableRows] = useState([]);
  const { id } = useParams();
  const { allUsers } = useContext(usersContext);

  // Retrieve all current project tasks
  useEffect(() => {
    // axios
    //   .get(`/api/projects/${id}/tasks`)
    //   .then((response) => {
    //     const allTasks = response.data.tasks;

    const taskList = userTasks
      .filter((task) => {
        console.log("FILTER: ", task);
        return task.project_id === Number(id);
      })
      .map((item) => {
        console.log("MAP: ", item);

        function completeStatusBool() {
          if (item.status === "Complete") return "grey";
        }
        // converting date data to more readable data
        let date = moment(item.due_date).utc().format("YYYY-MM-DD");

        let ownerName = getProjectOwnerName(item.owner_id, allUsers);

        let generatedDefaultValue = [];
        function defaultChecks() {
          if (item.status === "Complete") {
            generatedDefaultValue.push(item.name);
          }
          return generatedDefaultValue;
        }
        const checkValues = defaultChecks();

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
          console.log("UPDATEDTASKS: ", updatedTasks);

          // filter updated userProjects with status change
          const filteredTask = updatedTasks.filter((project) => {
            return project.id == id;
          });
          console.log("FILTEREDTASKS: ", filteredTask);

          console.log(filteredTask[0]);
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
            <Td>{item.name}</Td>
            <Td>{ownerName}</Td>
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

  const projectName = getProjectName(id, userProjects);

  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Tasks for Project {projectName}
      </Heading>
      <Center>
        <Container borderWidth="1px" borderRadius="lg" maxW="8xl">
          <TableContainer>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Complete</Th>
                  <Th>Name</Th>
                  <Th>Owner</Th>
                  <Th>Due Date</Th>
                  <Th>Status</Th>
                  <Th>Priority</Th>
                </Tr>
              </Thead>
              <Tbody>{tableRows}</Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Center>
    </div>
  );
}
