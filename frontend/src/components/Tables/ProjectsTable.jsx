import React, { useContext } from "react";
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
import {
  getProjectOwnerName,
  updateUserProjectStatus,
} from "../../helpers/selectors";
// import { viewsContext } from "../../Providers/ViewsProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";

export default function ProjectsTable({ onEdit }) {
  // const { projectList } = props;
  const { userProjects, setUserProjects } = useContext(projectsContext);
  const { allUsers } = useContext(usersContext);

  const projectsColumn = ["Complete", "Name", "Owner", "Due Date", "Status"];

  const projectsHeader = projectsColumn.map((column, index) => {
    return <Th key={index}>{column}</Th>;
  });

  // Generates list of projects in table row format
  const projectList = userProjects.map((item) => {
    // converting date data to more readable data
    // console.log("ITEMDUEDATE: ", item.due_date);
    let date = moment(item.due_date).utc().format("YYYY-MM-DD");
    // console.log("OWNERID: ", item.owner_id);
    // console.log("USERDATA:", userData);

    // BACKEND QUERY SELECT p.*, u.first_name AS user_first_name FROM projects p LEFT JOIN users u ON u.id = p.owner_id
    // less secure, should make specific queries, slower * something to know in future
    let ownerName = getProjectOwnerName(item.owner_id, allUsers);

    // Adds all projects with Complete status so that it can be populated on the list with checkbox marked
    let generatedDefaultValue = [];
    function defaultChecks() {
      if (item.status === "Complete") {
        generatedDefaultValue.push(item.name);
      }
      return generatedDefaultValue;
    }
    const checkValues = defaultChecks();

    // For tasks with Complete status, it returns grey so it can be marked
    function completeStatusBool() {
      if (item.status === "Complete") return "grey";
    }

    // function that updates status when checkbox is clicked
    function checkClick(e, id) {
      // console.log("OLDSTATUS: ", item.status);
      // console.log("OLDITEM: ", item);
      // console.log("CHECKBOX CLICKED", e.target.checked);
      // console.log("CHECKBOX EVENT", e);
      // console.log("ITEMID CHECK", id);

      // updates the project status and returns array of all userProjects with update
      const updatedProjects = updateUserProjectStatus(
        userProjects,
        id,
        e.target.checked
      );

      // filter updated userProjects with status change
      const filteredProject = updatedProjects.filter((project) => {
        return project.id == id;
      });
      // console.log("FILTEREDPROJECT: ", filteredProject);
      // console.log("NEWSTATUS: ", item.status);
      // console.log("NEWITEM: ", item);

      axios.put(`/api/projects/${id}`, filteredProject[0]).then(() => {
        setUserProjects(updatedProjects);
        // console.log("SUCCESSFUL!");
      });
    }

    return (
      // Temporary hack for freshly added projects without database id (until page refresh)
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
        <Td onClick={(e) => onEdit(item)}>{ownerName}</Td>
        <Td onClick={(e) => onEdit(item)}>{date}</Td>
        <Td onClick={(e) => onEdit(item)}>{item.status}</Td>
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
