import React, { useState } from "react";
import { Heading, Center } from "@chakra-ui/react";
import TasksTrello from "./TasksTrello";
import TasksTable from "./TasksTable";
import ViewSelect from "../Layout/ViewSelect";
import ModalForm from "../Layout/ModalForm";

export default function Tasks({
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
  const [viewValue, setViewValue] = useState("List");

  function triggerEditTask(task) {
    setEditTask(task);
    setModalState("tasks");
    onOpen();
  }

  function viewTasks() {
    if (viewValue === "List") {
      return <TasksTable onEdit={triggerEditTask} />;
    } else if (viewValue === "Board") {
      return <TasksTrello modalState={modalState} onEdit={triggerEditTask} />;
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
            Tasks
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
              setViewValue={setViewValue}
              viewValue={viewValue}
              setModalState={setModalState}
              onOpen={onOpen}
              state="tasks"
            />
          </div>
        </div>
        {viewTasks()}
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
