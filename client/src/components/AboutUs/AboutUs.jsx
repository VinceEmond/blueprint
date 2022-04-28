import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Link,
} from "@chakra-ui/react";
import DylanPirrottaAvatar from "../../assets/images/DylanPirrottaAvatar.jpg";
import PabloTackAvatar from "../../assets/images/PabloTackAvatar.jpg";
import VinceEmondAvatar from "../../assets/images/VinceEmondAvatar.jpg";

export default function AboutUs() {
  return (
    <Center py={6}>
      <HStack spacing="24px">
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={DylanPirrottaAvatar} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Dylan Pirrotta
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              <Link href="https://www.linkedin.com/in/dpirrott">LinkedIn</Link>
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Full-Stack Developer with a background in mechanical engineering
              who enjoys solving complex problems with elegant solutions.
            </Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Link
                href={
                  "https://www.canva.com/design/DAE90jr1eZA/W6iuDchETcg_sZd0qmEcmw/view?utm_content=DAE90jr1eZA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                }
              >
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  RESUME
                </Button>
              </Link>

              <Link href={"https://github.com/dpirrott"}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
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
                  GITHUB
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={VinceEmondAvatar} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Vince Emond
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              <Link href="https://www.linkedin.com/in/vinceemond/">
                LinkedIn
              </Link>
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Transitioning from 10 years in photography and video production,
              Vince is a mix of pure logic blended with a creative flair.
            </Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Link href="https://www.canva.com/design/DAE9Fw6vb_A/SvuQStWGfmRczWUx5gHOkg/view?utm_content=DAE9Fw6vb_A">
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  RESUME
                </Button>
              </Link>
              <Link href={"https://github.com/vinceemond/"}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
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
                  GITHUB
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={PabloTackAvatar} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Pablo Tack
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              <Link href="https://www.linkedin.com/in/tackpablo/">
                LinkedIn
              </Link>
            </Text>

            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Previously in biotech, transitioning into tech to drive impactful
              change while building efficient projects with real life use cases.
            </Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              alignItems={"center"}
            >
              <Link
                href="https://resume.creddle.io/resume/ax7ezvyocao"
                isExternal
              >
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  RESUME
                </Button>
              </Link>
              <Link href="https://github.com/tackpablo" isExternal>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
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
                  GITHUB
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </HStack>
    </Center>
  );
}
