import React, { useState, useContext } from "react";
import ProjectsTrello from "./ProjectsTrello";
import ProjectsTable from "./ProjectsTable";
import ViewSelect from "../Layout/ViewSelect";
import ModalForm from "../Layout/ModalForm";
import { viewsContext } from "../../Providers/ViewsProvider";
import { Heading, Center } from "@chakra-ui/react";
import Background from "../../assets/images/AdobeStock_409790026-70-highs.jpg";

export default function Projects({
  modalState,
  setModalState,
  isOpen,
  onOpen,
  onClose,
}) {
  const [editTask, setEditTask] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const { viewValue, setViewValue } = useContext(viewsContext);

  function triggerEditProject(project) {
    console.log(project);
    setEditProject(project);
    setModalState("projects");
    onOpen();
  }

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
    <Center>
      <div
        style={{
          maxWidth: "2000px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Heading
            display="flex"
            as="h1"
            size="3xl"
            isTruncated
            style={{
              backgroundColor: "#0a171e",
              // opacity: "0.9",
              color: "white",
              paddingBottom: "0.4em",
              marginBottom: "0.2em",
            }}
          >
            Projects
          </Heading>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              marginBottom: "0.6em",
            }}
          >
            <ViewSelect
              onOpen={onOpen}
              state="projects"
              setModalState={setModalState}
              setViewValue={setViewValue}
            />
          </div>
        </div>
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
    </Center>
  );
}
