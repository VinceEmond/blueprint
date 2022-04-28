import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
} from "@chakra-ui/react";

export default function ProjectCard({ project, onEdit }) {
  const STATUS_TEXT_COLOR =
    project.status === "Complete"
      ? "green"
      : project.status === "In Progress"
      ? "orange"
      : project.status === "Pending"
      ? "red"
      : "grey";
  return (
    <Center py={6} flex="15" height="285px" width="33%">
      <Box
        w={"full"}
        bg={"rgba(10,23,30,1)"}
        border={"2px solid white"}
        color={"white"}
        boxShadow={"2xl"}
        borderRadius={"30px"}
        p={4}
        textAlign={"center"}
      >
        <Box onClick={(e) => onEdit(project)}>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {project.name}
          </Heading>
          <Text fontWeight={600} color={STATUS_TEXT_COLOR} mb={4}>
            {project.status}
          </Text>
          <Text textAlign={"center"} color={"white"} px={1} noOfLines={2}>
            {project.description}
          </Text>
        </Box>

        <Stack
          mt={8}
          direction={"row"}
          spacing={2}
          justifyContent="center"
          marginTop="16px"
        >
          <Link
            _hover={{ textDecoration: "none" }}
            width={"fit-content"}
            href={`/projects/${project.id}`}
          >
            <Button
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              alignSelf="center"
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              View Project
            </Button>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
}
