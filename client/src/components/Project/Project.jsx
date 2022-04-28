import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { viewsContext } from "../../Providers/ViewsProvider";
import { getProjectName } from "../../helpers/selectors";
import ViewSelect from "../Layout/ViewSelect";
import ProjectTable from "./ProjectTable";
import ProjectTrello from "./ProjectTrello";
import ModalForm from "../Layout/ModalForm";
import { Heading, Center } from "@chakra-ui/react";

export default function Project({
  modalState,
  setModalState,
  isOpen,
  onOpen,
  onClose,
  transcript,
  voiceCommand,
  isAccepted,
  setIsAccepted,
}) {
  const [editTask, setEditTask] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const { userProjects } = useContext(projectsContext);
  const { viewValue, setViewValue } = useContext(viewsContext);
  const { id } = useParams();

  const projectName = getProjectName(id, userProjects);

  function triggerEditTask(task) {
    setEditTask(task);
    setModalState("tasks");
    onOpen();
  }

  function viewProject() {
    if (viewValue === "List") {
      return <ProjectTable onEdit={triggerEditTask} />;
    } else if (viewValue === "Board") {
      return <ProjectTrello onEdit={triggerEditTask} />;
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
              color: "white",
              paddingBottom: "0.4em",
              marginBottom: "0.2em",
            }}
          >
            {projectName}
          </Heading>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              marginBottom: "0.6em",
              marginRight: "1em",
            }}
          >
            <ViewSelect
              onOpen={onOpen}
              state="tasks"
              setModalState={setModalState}
              viewValue={viewValue}
              setViewValue={setViewValue}
            />
          </div>
        </div>
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
          transcript={transcript}
          voiceCommand={voiceCommand}
          isAccepted={isAccepted}
          setIsAccepted={setIsAccepted}
        />
      </div>
    </Center>
  );
}
