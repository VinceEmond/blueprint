import React, { useContext } from "react";
import axios from "axios";
import moment from "moment";
import {
  getProjectOwnerName,
  updateUserProjectStatus,
} from "../../helpers/selectors";
import { usersContext } from "../../Providers/UsersProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";
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

export default function ProjectsTable({ onEdit }) {
  const { userProjects, setUserProjects } = useContext(projectsContext);
  const { allUsers } = useContext(usersContext);

  const projectsColumn = ["Complete", "Name", "Owner", "Due Date", "Status"];

  const projectsHeader = projectsColumn.map((column, index) => {
    return <Th key={index}>{column}</Th>;
  });

  const projectList = userProjects.map((item) => {
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");

    let ownerName = getProjectOwnerName(item.owner_id, allUsers);

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
        <Td onClick={() => onEdit(item)}>{ownerName}</Td>
        <Td onClick={() => onEdit(item)}>{date}</Td>
        <Td onClick={() => onEdit(item)}>{item.status}</Td>
      </Tr>
    );
  });

  return (
    <Center>
      <Container borderWidth="1px" borderRadius="lg" maxW="8xl">
        <TableContainer>
          <Table size="lg">
            <Thead>
              <Tr>{projectsHeader}</Tr>
            </Thead>
            <Tbody>{projectList}</Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Center>
  );
}
