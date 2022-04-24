import React, { useState, useEffect, useContext } from "react";
import { Heading, useDisclosure } from "@chakra-ui/react";
import TasksTrello from "./TasksTrello";
import TasksTable from "./TasksTable";
import ViewSelect from "../Layout/ViewSelect";
import ModalForm from "../Layout/ModalForm";

export default function Tasks() {
  const [editTask, setEditTask] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [modalState, setModalState] = useState("hide");
  const [viewValue, setViewValue] = useState("List");
  const { isOpen, onOpen, onClose } = useDisclosure();

  function triggerEditTask(task) {
    console.log(task);
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
    <div>
      <Heading display="flex" as="h1" size="3xl" isTruncated m="0.5em">
        Tasks
      </Heading>
      <ViewSelect
        setViewValue={setViewValue}
        setModalState={setModalState}
        onOpen={onOpen}
        state="tasks"
      />
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
      />
    </div>
  );
}
