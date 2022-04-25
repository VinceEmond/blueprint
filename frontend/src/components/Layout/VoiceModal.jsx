import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function VoiceModal({ modalState, voiceCommand, transcript }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            backgroundColor: "rgba(7, 30, 43,0.9)",
            color: "white",
            border: "3px solid white",
          }}
        >
          <ModalHeader>Voice Commands</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              <strong>Open Page </strong>"Open *Home, *Dashboard, *Tasks,
              *Projects"
            </p>
            <br />
            <p>
              <strong>Add Project/Task </strong>"Add *Task/Tasks,
              *Project/Projects"
            </p>
            <br />
            <p>Press 1 to give commands, 2 to stop giving commands</p>
            <br />
            <br />

            <p style={{ color: "red", fontSize: "1.5em" }}>
              Listening: {transcript}
            </p>
          </ModalBody>
          <br />
          <br />
          <br />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
