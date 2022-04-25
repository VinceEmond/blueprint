import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  Center,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import Background from "../../assets/images/AdobeStock_409790026-70-highs.jpg";
import BlueprintLogo from "../../assets/images/blueprint-logo.png";

export default function CallToActionWithAnnotation() {
  return (
    <div
    // style={{
    //   backgroundImage: `url(${Background})`,
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat",
    //   paddingTop: "3em",
    //   minHeight: "100vh",
    // }}
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container
        style={{
          backgroundColor: "rgba(10,23,30, 0)",
          // background: "transparent",
          maxWidth: "80em",
          // maxHeight: "10em",
          marginTop: "5em",
        }}
      >
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          style={{
            padding: "0",
          }}
        >
          <Center>
            <Box width="500px" marginLeft="30px">
              <img src={BlueprintLogo} alt="blueprint logo"></img>
            </Box>
          </Center>
          <Heading
            marg
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            style={{
              color: "white",
              fontSize: "4em",
            }}
          >
            Pace&nbsp;
            <Text as={"span"} color={"teal.600"}>
              Your Projects
            </Text>
          </Heading>
          <Text
            color={"gray.500"}
            style={{
              color: "white",
              fontSize: "1.2em",
              marginTop: "10px",
            }}
          >
            Perfect for freelancers, agencies, and moonlighters,<br></br>
            blueprint is an exclusive resource for project management.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
            style={{ marginTop: "20px" }}
          >
            <Button
              colorScheme={"white"}
              bg={"teal.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "teal.500",
                color: "white",
              }}
              as="a"
              href="/register"
            >
              Get Started
            </Button>
            <Button
              variant={"link"}
              colorScheme={"blue"}
              size={"sm"}
              as="a"
              href="/aboutus"
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
