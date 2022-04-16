import React from "react";
import { Box, Heading, Center, LinkBox, LinkOverlay } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Center>
      <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
        <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
          Thursday, April 14
        </Box>
        <Heading size="md" my="2">
          <LinkOverlay>Good Afternoon, Vince</LinkOverlay>
        </Heading>
      </LinkBox>
    </Center>
  );
}
