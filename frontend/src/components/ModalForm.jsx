import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import NewTaskForm from "./NewTaskForm";
import NewProjectForm from "./NewProjectForm";

export default function ModalForm({
  setModalState,
  modalState,
  setUserTasks,
  isOpen,
  onClose,
}) {
  return (
    <>
      {modalState === "tasks" && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mw="60%">
            <ModalHeader margin="10px">New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewTaskForm
                setUserTasks={setUserTasks}
                setModalState={setModalState}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {modalState === "projects" && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mw="60%">
            <ModalHeader margin="10px">New Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewProjectForm setModalState={setModalState} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
