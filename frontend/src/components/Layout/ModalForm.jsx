import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import NewTaskForm from "../Forms/NewTaskForm";
import NewProjectForm from "../Forms/NewProjectForm";

export default function ModalForm({
  setModalState,
  modalState,
  isOpen,
  onClose,
  editTask,
  setEditTask,
  editProject,
  setEditProject,
}) {
  const clearEditTask = () => {
    onClose();
    setEditTask(null);
    // console.log("I'm clearing editTask");
  };

  const clearEditProject = () => {
    onClose();
    setEditProject(null);
    console.log("I'm clearing editProject");
  };

  return (
    <>
      {modalState === "tasks" && (
        <Modal isCentered isOpen={isOpen} onClose={() => clearEditTask()}>
          <ModalOverlay />
          <ModalContent mw="60%">
            <ModalHeader margin="10px">
              {editTask ? "Edit Task" : "New Task"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewTaskForm
                setModalState={setModalState}
                editTask={editTask}
                setEditTask={setEditTask}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {modalState === "projects" && (
        <Modal isCentered isOpen={isOpen} onClose={() => clearEditProject()}>
          <ModalOverlay />
          <ModalContent mw="60%">
            <ModalHeader margin="10px">
              {editProject ? "Edit Project" : "New Project"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewProjectForm
                setModalState={setModalState}
                editProject={editProject}
                setEditProject={setEditProject}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
