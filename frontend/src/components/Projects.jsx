import React, { useState, useContext } from "react";
import { Heading, useDisclosure } from "@chakra-ui/react";
// package that allows conversion of date data
import TrelloProjects from "./Trello/TrelloProjects";
import ProjectTable from "./Tables/ProjectTable";
import ViewSelect from "./ViewSelect";
import ModalForm from "./ModalForm";
import { viewsContext } from "../Providers/ViewsProvider";
import { projectsContext } from "../Providers/ProjectsProvider";

export default function Projects() {
  // const [userProjects, setUserProjects] = useState([]);
  // const [viewValue, setViewValue] = useState("List");
  const [modalState, setModalState] = useState("hide");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [userData, setUserData] = useState(null);
  const { viewValue, setViewValue } = useContext(viewsContext);
  const { setUserProjects } = useContext(projectsContext);
  // const { allUsers } = useContext(usersContext);

  // When mounted, API call for DB query for all users and specific user's name when component renders
  // useEffect(() => {
  //   const controller = new AbortController();
  //   axios
  //     .get("/api/users")
  //     .then((response) => {
  //       const allUsers = response.data.users;
  //       setUserData(allUsers);
  //       // console.log("ALLUSERS: ", allUsers);

  //       return () => {
  //         controller.abort();
  //       };
  //     })
  //     .catch((err) => console.log("err:", err));
  // }, []);

  // Retrieve all tasks (eventually user specific tasks)
  // useEffect(() => {
  //   axios
  //     .get("/api/projects")
  //     .then((response) => {
  //       const allProjects = response.data.projects;
  //       setUserProjects(allProjects);
  //       // console.log("ALLPROJECTS: ", allProjects);
  //     })
  //     .catch((err) => console.log("err:", err));
  // }, [viewValue]);

  // Generates list of projects in table row format
  // const projectList = userProjects.map((item) => {
  //   // converting date data to more readable data
  //   let date = moment(item.due_date).utc().format("YYYY-MM-DD");
  //   // console.log("OWNERID: ", item.owner_id);
  //   // console.log("USERDATA:", userData);
  //   let ownerName = getProjectOwnerName(item.owner_id, allUsers);

  //   // Adds all projects with Complete status so that it can be populated on the list with checkbox marked
  //   let generatedDefaultValue = [];
  //   function defaultChecks() {
  //     if (item.status === "Complete") {
  //       generatedDefaultValue.push(item.name);
  //     }
  //     return generatedDefaultValue;
  //   }
  //   const checkValues = defaultChecks();

  //   // For tasks with Complete status, it returns grey so it can be marked
  //   function completeStatusBool() {
  //     if (item.status === "Complete") return "grey";
  //   }

  //   // function that updates status when checkbox is clicked
  //   function checkClick(e, id) {
  //     // console.log("OLDSTATUS: ", item.status);
  //     // console.log("OLDITEM: ", item);
  //     // console.log("CHECKBOX CLICKED", e.target.checked);
  //     // console.log("CHECKBOX EVENT", e);
  //     // console.log("ITEMID CHECK", id);

  //     // updates the project status and returns array of all userProjects with update
  //     const updatedProjects = updateUserProjectStatus(
  //       userProjects,
  //       id,
  //       e.target.checked
  //     );

  //     // filter updated userProjects with status change
  //     const filteredProject = updatedProjects.filter((project) => {
  //       return project.id == id;
  //     });
  //     // console.log("FILTEREDPROJECT: ", filteredProject);
  //     // console.log("NEWSTATUS: ", item.status);
  //     // console.log("NEWITEM: ", item);

  //     axios.put(`/api/projects/${id}`, filteredProject[0]).then(() => {
  //       setUserProjects(updatedProjects);
  //       // console.log("SUCCESSFUL!");
  //     });
  //   }

  //   return (
  //     // Temporary hack for freshly added projects without database id (until page refresh)
  //     <Tr key={item.id || item.description.length * 10} bg={completeStatusBool}>
  //       <Td size="sm">
  //         <CheckboxGroup defaultValue={checkValues}>
  //           <Checkbox
  //             ml="2em"
  //             value={item.name}
  //             onChange={(e) => checkClick(e, item.id)}
  //           ></Checkbox>
  //         </CheckboxGroup>
  //       </Td>
  //       <Td>{item.name}</Td>
  //       <Td>{ownerName}</Td>
  //       <Td>{date}</Td>
  //       <Td>{item.status}</Td>
  //     </Tr>
  //   );
  // });

  // returns component based on view option
  function view() {
    if (viewValue === "List") {
      // setViewValue("List");
      return <ProjectTable />;
    } else if (viewValue === "Board") {
      // setViewValue("Board");
      return <TrelloProjects />;
    }
  }

  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Projects
      </Heading>
      <ViewSelect
        setViewValue={setViewValue}
        setModalState={setModalState}
        onOpen={onOpen}
        state="projects"
      />
      {view()}
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        modalState={modalState}
        setModalState={setModalState}
        setUserTasks={null}
        setUserProjects={setUserProjects}
      />
    </div>
  );
}
