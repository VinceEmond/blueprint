import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { viewsContext } from "../../Providers/ViewsProvider";
import { getProjectName } from "../../helpers/selectors";
import ViewSelect from "../Layout/ViewSelect";
import ProjectTable from "./ProjectTable";
import ProjectTrello from "./ProjectTrello";
import ModalForm from "../Layout/ModalForm";
import { Heading, useDisclosure } from "@chakra-ui/react";

export default function Project() {
  const [modalState, setModalState] = useState("hide");
  const [editTask, setEditTask] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProjects } = useContext(projectsContext);
  const { viewValue, setViewValue } = useContext(viewsContext);
  const { id } = useParams();

  const projectName = getProjectName(id, userProjects);

  // consider moving to helper function file
  function triggerEditTask(task) {
    setEditTask(task);
    setModalState("tasks");
    onOpen();
  }

  // consider moving to helper function file
  function viewProject() {
    if (viewValue === "List") {
      return <ProjectTable onEdit={triggerEditTask} />;
    } else if (viewValue === "Board") {
      return <ProjectTrello onEdit={triggerEditTask} />;
    }
  }

  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Tasks for Project {projectName}
      </Heading>
      <ViewSelect
        onOpen={onOpen}
        state="tasks"
        setModalState={setModalState}
        setViewValue={setViewValue}
      />
      {viewProject()}
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
    </div>
  );
}
