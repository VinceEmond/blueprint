import React, { useState, useContext } from "react";
import ProjectsTrello from "./ProjectsTrello";
import ProjectsTable from "./ProjectsTable";
import ViewSelect from "../Layout/ViewSelect";
import ModalForm from "../Layout/ModalForm";
import { viewsContext } from "../../Providers/ViewsProvider";
import { Heading, useDisclosure } from "@chakra-ui/react";

export default function Projects() {
  const [modalState, setModalState] = useState("hide");
  const [editTask, setEditTask] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { viewValue, setViewValue } = useContext(viewsContext);

  // consider moving to helper function file
  function triggerEditProject(project) {
    console.log(project);
    setEditProject(project);
    setModalState("projects");
    onOpen();
  }

  // consider moving to helper function file
  function viewProjects() {
    if (viewValue === "List") {
      return <ProjectsTable onEdit={triggerEditProject} />;
    } else if (viewValue === "Board") {
      return (
        <ProjectsTrello modalState={modalState} onEdit={triggerEditProject} />
      );
    }
  }

  return (
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Projects
      </Heading>
      <ViewSelect
        onOpen={onOpen}
        state="projects"
        setModalState={setModalState}
        setViewValue={setViewValue}
      />
      {viewProjects()}
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
