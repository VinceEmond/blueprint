import NewTaskForm from "../Forms/NewTaskForm";
import NewProjectForm from "../Forms/NewProjectForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function ModalForm({
  isOpen,
  onClose,
  modalState,
  setModalState,
  editTask,
  setEditTask,
  editProject,
  setEditProject,
}) {
  function clearEditTask() {
    onClose();
    setEditTask(null);
  }

  function clearEditProject() {
    onClose();
    setEditProject(null);
  }

  return (
    <>
      {modalState === "tasks" && (
        <Modal isCentered isOpen={isOpen} onClose={() => clearEditTask()}>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
          <ModalContent
            mw="60%"
            style={{
              backgroundColor: "rgba(7, 30, 43,0.9)",
              color: "white",
              border: "3px solid white",
            }}
          >
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
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
          <ModalContent
            mw="60%"
            style={{
              backgroundColor: "rgba(7, 30, 43,0.9)",
              color: "white",
              border: "3px solid white",
            }}
          >
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
