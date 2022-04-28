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
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import checkmark from "../../assets/images/checkmark2.png";

export default function ModalForm({
  isOpen,
  onClose,
  modalState,
  setModalState,
  editTask,
  setEditTask,
  editProject,
  setEditProject,
  transcript,
  isAccepted,
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

      {modalState === "voice" && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
          <ModalContent
            style={{
              backgroundColor: "rgba(7, 30, 43,0.9)",
              color: "white",
              border: "3px solid white",
            }}
          >
            <ModalHeader
              style={{
                fontSize: "1.5em",
              }}
            >
              Listening...
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <div style={{ maxWidth: "50px" }}>
                  {isAccepted && <img src={checkmark} alt="Checkmark" />}
                  {!isAccepted && (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  )}
                </div>
              </Center>
              <Center>
                <p style={{ color: "white", fontSize: "1.5em" }}>
                  {transcript}
                </p>
              </Center>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
