import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Heading, useDisclosure } from "@chakra-ui/react";
// package that allows conversion of date data
import { projectsContext } from "../../Providers/ProjectsProvider";
import { viewsContext } from "../../Providers/ViewsProvider";
import { getProjectName } from "../../helpers/selectors";
import ViewSelect from "../Layout/ViewSelect";
import ProjectTable from "./ProjectTable";
import ProjectTrello from "./ProjectTrello";
import ModalForm from "../Layout/ModalForm";

export default function Project() {
  // const [userTasks, setUserTasks] = useState([]);
  const [modalState, setModalState] = useState("hide");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProjects } = useContext(projectsContext);
  const { id } = useParams();
  const { viewValue, setViewValue } = useContext(viewsContext);
  const [editTask, setEditTask] = useState(null);
  const [editProject, setEditProject] = useState(null);

  // const projectColumn = [
  //   "Complete",
  //   "Name",
  //   "Assignee",
  //   "Due Date",
  //   "Status",
  //   "Priority",
  // ];

  // const projectHeader = projectColumn.map((column, index) => {
  //   return <Th key={index}>{column}</Th>;
  // });

  // Retrieve all current project tasks
  // useEffect(() => {
  //   // axios
  //   //   .get(`/api/projects/${id}/tasks`)
  //   //   .then((response) => {
  //   //     const allTasks = response.data.tasks;

  //   const taskList = userTasks
  //     .filter((task) => {
  //       console.log("FILTER: ", task);
  //       return task.project_id === Number(id);
  //     })
  //     .map((item) => {
  //       console.log("MAP: ", item);

  //       function completeStatusBool() {
  //         if (item.status === "Complete") return "grey";
  //       }
  //       // converting date data to more readable data
  //       let date = moment(item.due_date).utc().format("YYYY-MM-DD");
  //       let assigneeName = getAssigneeName(item.assignee_id, allUsers);
  //       console.log("ALLUSERS: ", allUsers);
  //       console.log("ASSIGNEEID: ", item.assignee_id);
  //       // console.log("OWNERNAME: ", assigneeName);

  //       let generatedDefaultValue = [];
  //       function defaultChecks() {
  //         if (item.status === "Complete") {
  //           generatedDefaultValue.push(item.name);
  //         }
  //         return generatedDefaultValue;
  //       }
  //       const checkValues = defaultChecks();

  //       function checkClick(e, id) {
  //         // console.log("OLDSTATUS: ", item.status);
  //         // console.log("OLDITEM: ", item);
  //         // console.log("CHECKBOX CLICKED", e.target.checked);
  //         // console.log("CHECKBOX EVENT", e);
  //         // console.log("ITEMID CHECK", id);

  //         // updates the project status and returns array of all userProjects with update
  //         const updatedTasks = updateUserTaskStatus(
  //           userTasks,
  //           id,
  //           e.target.checked
  //         );
  //         console.log("UPDATEDTASKS: ", updatedTasks);

  //         // filter updated userProjects with status change
  //         const filteredTask = updatedTasks.filter((project) => {
  //           return project.id == id;
  //         });
  //         console.log("FILTEREDTASKS: ", filteredTask);

  //         console.log(filteredTask[0]);
  //         // console.log("FILTEREDPROJECT: ", filteredProject);
  //         // console.log("NEWSTATUS: ", item.status);
  //         // console.log("NEWITEM: ", item);

  //         axios.put(`/api/tasks/${id}`, filteredTask[0]).then(() => {
  //           setUserTasks(updatedTasks);
  //           // console.log("SUCCESSFUL!");
  //         });
  //       }

  //       return (
  //         <Tr key={item.id} bg={completeStatusBool}>
  //           <Td size="sm">
  //             <CheckboxGroup defaultValue={checkValues}>
  //               <Checkbox
  //                 ml="2em"
  //                 value={item.name}
  //                 onChange={(e) => checkClick(e, item.id)}
  //               ></Checkbox>
  //             </CheckboxGroup>
  //           </Td>
  //           <Td>{item.name}</Td>
  //           <Td>{assigneeName}</Td>
  //           <Td>{date}</Td>
  //           <Td>{item.status}</Td>
  //           <Td>{item.priority}</Td>
  //         </Tr>
  //       );
  //     });

  //   setTableRows(taskList);
  //   // })
  //   // .catch((err) => console.log("err:", err));
  // }, [userTasks, allUsers]);

  const projectName = getProjectName(id, userProjects);

  // returns component based on view option
  const triggerEditTask = (task) => {
    // console.log(task);
    setEditTask(task);
    setModalState("tasks");
    onOpen();
  };

  // returns component based on view option
  function view() {
    if (viewValue === "List") {
      // setViewValue("List");
      return <ProjectTable onEdit={triggerEditTask} />;
    } else if (viewValue === "Board") {
      // setViewValue("Board");
      return <ProjectTrello onEdit={triggerEditTask} />;
    }
  }

  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Tasks for Project {projectName}
      </Heading>
      <ViewSelect
        setViewValue={setViewValue}
        setModalState={setModalState}
        onOpen={onOpen}
        state="tasks"
      />
      {view()}
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        modalState={modalState}
        setModalState={setModalState}
        editTask={editTask}
        setEditTask={setEditTask}
        editProject={editProject}
        setEditProject={setEditProject}
      />
      {/* <Center>
        <Container borderWidth="1px" borderRadius="lg" maxW="8xl">
          <TableContainer>
            <Table size="lg">
              <Thead>
                <Tr>{projectHeader}</Tr>
              </Thead>
              <Tbody>{tableRows}</Tbody>
            </Table>
          </TableContainer>
        </Container> */}
      {/* </Center> */}
    </div>
  );
}
