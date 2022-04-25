import { Box, HStack, Image } from "@chakra-ui/react";

export default function MessageBoard(props) {
  const {
    index,
    messageTimestamp,
    messageBubbleColor,
    messageContent,
    senderAvatar,
    senderName,
  } = props;

  return (
    <div style={{ color: "white" }} key={index}>
      <HStack display="flex" justifyContent="center">
        <p>{messageTimestamp}</p>
      </HStack>

      <HStack
        key={index}
        marginLeft="10px"
        marginRight="10px"
        marginTop="4px"
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
      >
        <Box boxSize="50px">
          <Image
            src={senderAvatar}
            alt="Avatar"
            borderRadius="full"
            boxSize="50px"
            maxW="50px"
            ratio={1}
          />
        </Box>

        <div>
          <p>{senderName} Says:</p>
          <Box
            key={index}
            borderRadius="lg"
            marginBottom="5px"
            bg={messageBubbleColor}
            p={4}
            color="white"
          >
            <p>{messageContent}</p>
          </Box>
        </div>
      </HStack>
    </div>
  );
}
