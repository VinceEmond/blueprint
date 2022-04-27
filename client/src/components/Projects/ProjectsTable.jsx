import React, { useContext } from "react";
import axios from "axios";
import moment from "moment";
import {
  getProjectOwnerName,
  updateUserProjectStatus,
  taskCount,
} from "../../helpers/selectors";
import { usersContext } from "../../Providers/UsersProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { tasksContext } from "../../Providers/TasksProvider";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Link,
  Container,
  Center,
  Td,
  Checkbox,
  CheckboxGroup,
  Button,
} from "@chakra-ui/react";

export default function ProjectsTable({ onEdit }) {
  const { userProjects, setUserProjects } = useContext(projectsContext);
  const { userTasks } = useContext(tasksContext);
  const { allUsers } = useContext(usersContext);

  const projectsColumn = [
    "Complete",
    "Project Name",
    "No. of Tasks",
    "Owner",
    "Due Date",
    "Status",
    "View Tasks",
  ];
  const projectsHeader = projectsColumn.map((column, index) => {
    return (
      <Th
        key={index}
        style={{ color: "white", backgroundColor: "transparent" }}
      >
        {column}
      </Th>
    );
  });

  const projectList = userProjects.map((item) => {
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");

    let ownerName = getProjectOwnerName(item.owner_id, allUsers);

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
      const updatedProjects = updateUserProjectStatus(
        userProjects,
        id,
        e.target.checked
      );

      const filteredProject = updatedProjects.filter((project) => {
        return project.id == id;
      });

      axios.put(`/api/projects/${id}`, filteredProject[0]).then(() => {
        setUserProjects(updatedProjects);
      });
    }

    let taskCountResult = taskCount(item.id, userTasks);

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
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {item.name}
        </Td>

        <Td
          onClick={() => onEdit(item)}
          style={{ color: "white", textAlign: "center" }}
        >
          {taskCountResult}
        </Td>

        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {ownerName}
        </Td>
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {date}
        </Td>
        <Td onClick={() => onEdit(item)} style={{ color: "white" }}>
          {item.status}
        </Td>
        <Td style={{ color: "white" }}>
          <Link
            _hover={{ textDecoration: "none" }}
            width={"fit-content"}
            href={`/projects/${item.id}`}
          >
            <Button
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              alignSelf="center"
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              View
            </Button>
          </Link>
        </Td>
      </Tr>
    );
  });

  return (
    <div>
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
                <Tr>{projectsHeader}</Tr>
              </Thead>
              <Tbody>{projectList}</Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Center>
    </div>
  );
}
