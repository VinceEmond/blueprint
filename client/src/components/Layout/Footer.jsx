import { Box, Container, Stack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      className="footer"
      mt={"auto"}
      mb={"15px"}
      style={{
        backgroundColor: "rgba(10, 23, 30, 0.1)",
        color: "white",
        border: "0",
      }}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2022 blueprint. All rights reserved</Text>
      </Container>
    </Box>
  );
}
