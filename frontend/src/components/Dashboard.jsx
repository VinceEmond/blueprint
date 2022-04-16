import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Center, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { getUserName } from "../helpers/selectors";
import { set } from "lodash";

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/users")
      .then((response) => {
        const allUsers = response.data.users;
        setUserData(allUsers);
        // console.log("allUsers: ", allUsers);
        const specificUser = getUserName(userData, 3);
        setUserName(specificUser);

        return () => {
          controller.abort();
        };
      })
      .catch((err) => console.log("err:", err));
  }, []);

  return (
    <div>
      <Center>
        <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
          <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
            Thursday, April 14
          </Box>
          <Heading size="md" my="2">
            <LinkOverlay>Good Afternoon, {userName}</LinkOverlay>
          </Heading>
        </LinkBox>
      </Center>
    </div>
  );
}
