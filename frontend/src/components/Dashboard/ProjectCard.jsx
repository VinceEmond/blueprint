import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SocialProfileSimple({ project, onEdit }) {
  return (
    <Center py={6} flex="7" height="285px" width="33%">
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Box onClick={(e) => onEdit(project)}>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {project.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            {project.status}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
            noOfLines={3}
          >
            {project.description}
          </Text>
        </Box>

        <Stack mt={8} direction={"row"} spacing={4} justifyContent="center">
          <Link
            _hover={{ textDecoration: "none" }}
            width="50%"
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
