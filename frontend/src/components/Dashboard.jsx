import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Center,
  LinkBox,
  LinkOverlay,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import {
  getUserName,
  getUserSpecificTasks,
  getUserSpecificProjects,
} from "../helpers/selectors";
import Tasks from "./Dashboard/DashboardTasks";
import Projects from "./Dashboard/DashboardProjects";
import ModalForm from "./ModalForm";

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userTasks, setUserTasks] = useState(null);
  const [userProjects, setUserProjects] = useState(null);

  // State for current time and date
  const [date, setDate] = useState(new Date());

  // When mounted, we get the date/time that updates every 15 minutes
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 900000);

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
  // useEffect(() => {
  //   const controller = new AbortController();
  //   axios
  //     .get("/api/users")
  //     .then((response) => {
  //       const allUsers = response.data.users;
  //       // console.log(allUsers);
  //       const specificUser = getUserName(allUsers, 3);
  //       setUserData(specificUser);

  //       return () => {
  //         controller.abort();
  //       };
  //     })
  //     .catch((err) => console.log("err:", err));
  // }, []);

  // Retrieve all projects (eventually user specific projects)
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        const userID = 1;
        const allProjects = response.data.projects;
        const usersTasks = getUserSpecificTasks(userTasks, userID);
        const usersProjects = getUserSpecificProjects(
          allProjects,
          usersTasks,
          userID
        );
        setUserProjects(usersProjects);
      })
      .catch((err) => console.log("err:", err));
  }, [userTasks]);

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => {
        const allTasks = response.data.tasks;
        const usersTasks = getUserSpecificTasks(allTasks, 1);
        setUserTasks(usersTasks);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  // Onsubmit helper function for add tasks
  const addTask = (e, filter = "Not Started") => {
    e.preventDefault();
    const newTask = e.target[0].value.trim();
    e.target[0].value = "";
    if (newTask) {
      const taskFormValues = {
        name: newTask,
        status: filter,
        project_id: "1",
        assignee_id: "1",
        due_date: "2022-04-29",
        description: "Describe task",
        priority: "Low",
      };

      axios
        .post("/api/tasks", taskFormValues)
        .then((response) => {
          setUserTasks((prev) => [...prev, taskFormValues]);
          console.log("Succesfully added new Task to database");
        })
        .catch((err) => console.log("err:", err));
    }
  };

  return (
    <div>
      <Center mt="3em">
        <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
          <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
            <p>{currentDate}</p>
          </Box>
          <Heading size="md" my="2">
            <LinkOverlay>
              {timeMessage()}, {userData && userData.first_name}
            </LinkOverlay>
          </Heading>
        </LinkBox>
      </Center>

      <Container width="50%" maxWidth="100%">
        {/* Import dashboard tasks */}
        <Tasks
          // userTasks={userTasks}
          addTask={addTask}
          setModalState={setModalState}
          onOpen={onOpen}
        />
        {/* Import dashboard projects */}
        <Projects setModalState={setModalState} onOpen={onOpen} />
      </Container>

      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        modalState={modalState}
        setModalState={setModalState}
        // setUserTasks={setUserTasks}
      />
    </div>
  );
}
