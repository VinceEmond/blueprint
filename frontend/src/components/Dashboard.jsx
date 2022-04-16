import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Center, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { getUserName } from "../helpers/selectors";
import { set } from "lodash";

export default function Dashboard() {
  // State for all users from DB
  const [userData, setUserData] = useState([]);
  // State for specific user name
  const [userName, setUserName] = useState("");
  // State for current time and date
  const [date, setDate] = useState(new Date());

  // When mounted, we get the date/time that updates every second
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  // date options to display in WEEKDAY, MONTH DAY, YEAR format
  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // save into variable the current date using options
  const currentDate = date.toLocaleDateString("en-US", DATE_OPTIONS);

  // function to determine the hour and message depending on it
  function timeMessage() {
    const hours = new Date().getHours();
    let message = "";

    if (hours < 12) {
      message = "Good Morning";
    } else if (hours >= 12 && hours <= 17) {
      message = "Good Afternoon";
    } else if (hours >= 17 && hours <= 24) {
      message = "Good Evening";
    }

    return message;
  }

  // When mounted, API call for DB query for all users and specific user's name when component renders
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

        return function cleanup() {
          controller.abort();
        };
      })
      .catch((err) => console.log("err:", err));
  }, [userData]);

  return (
    <div>
      <Center mt={5}>
        <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
          <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
            <p>{currentDate}</p>
          </Box>
          <Heading size="md" my="2">
            <LinkOverlay>
              {timeMessage()}, {userName}
            </LinkOverlay>
          </Heading>
        </LinkBox>
      </Center>
    </div>
  );
}
