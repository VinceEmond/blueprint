import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Background from "../../assets/images/AdobeStock_415876411-no-text-flipped.jpg";

export default function LandingPage() {
  return (
    <div
      style={{
        // backgroundImage: `url(${Background})`,
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // position: "absolute",
        // top: 0,
        // left: 0,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // opacity: "0.5",
          // width: "100vh",
          // position: "absolute",
          // top: 0,
          // left: 0,
        }}
      >
        <div style={{ opacity: "1" }}>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={6} w={"full"} maxW={"lg"}>
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  <Text
                    as={"span"}
                    position={"relative"}
                    _after={{
                      content: "''",
                      width: "full",
                      height: useBreakpointValue({ base: "20%", md: "30%" }),
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "blue.400",
                      zIndex: -1,
                    }}
                  >
                    Pace
                  </Text>
                  <br />{" "}
                  <Text color={"blue.400"} as={"span"}>
                    Your Projects
                  </Text>{" "}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
                  blueprint. is an exclusive resource for project management.
                  It's perfect for freelancers, agencies, and moonlighters.
                </Text>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <a href="/login">
                    <Button
                      rounded={"full"}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Create Project
                    </Button>
                  </a>
                  <a href="/aboutus">
                    <Button rounded={"full"}>About Us</Button>
                  </a>
                </Stack>
              </Stack>
            </Flex>
          </Stack>
        </div>
      </div>
    </div>
  );
}
