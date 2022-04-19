import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  Center,
  IconButton,
  Input,
  LinkBox,
  LinkOverlay,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react';
import { getUserName } from '../helpers/selectors';
import { AddIcon } from '@chakra-ui/icons';
import NewTaskForm from './NewTaskForm';
import NewProjectForm from './NewProjectForm';
import ProjectsCarousel from './ProjectsCarousel';

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState(null);

  const [userData, setUserData] = useState(null);
  const [userTasks, setUserTasks] = useState(null);
  const [taskToggle, setTaskToggle] = useState(false);

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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // save into variable the current date using options
  const currentDate = date.toLocaleDateString('en-US', DATE_OPTIONS);

  // function to determine the hour and message depending on it
  function timeMessage() {
    const hours = new Date().getHours();
    let message = '';

    if (hours < 12) {
      message = 'Good Morning';
    } else if (hours >= 12 && hours <= 17) {
      message = 'Good Afternoon';
    } else if (hours >= 17 && hours <= 24) {
      message = 'Good Evening';
    }

    return message;
  }

  // When mounted, API call for DB query for all users and specific user's name when component renders
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('/api/users')
      .then((response) => {
        const allUsers = response.data.users;
        const specificUser = getUserName(allUsers, 3);
        setUserData(specificUser);

        return () => {
          controller.abort();
        };
      })
      .catch((err) => console.log('err:', err));
  }, []);

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get('/api/tasks')
      .then((response) => {
        const allTasks = response.data.tasks;
        setUserTasks(allTasks);
      })
      .catch((err) => console.log('err:', err));
  }, [taskToggle]);

  // Onsubmit helper function or quick add tasks
  const addTask = (e) => {
    e.preventDefault();
    const newTask = e.target[0].value.trim();
    e.target[0].value = '';
    if (newTask) {
      const taskFormValues = {
        name: newTask,
        status: 'Not Started',
        project_id: '1',
        assignee_id: '1',
        due_date: '2022-04-29',
        description: 'Describe task',
        priority: 'Low',
      };

      axios
        .post('/api/tasks', taskFormValues)
        .then((response) => {
          setTaskToggle((prev) => !prev);
          console.log('Succesfully added new Task to database');
        })
        .catch((err) => console.log('err:', err));
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
        <Container
          width="100%"
          maxWidth="100%"
          border="2px"
          borderRadius="5px"
          mt="4em">
          <Container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            maxWidth="100%">
            <Heading size="md" textAlign="left">
              My Priorities
            </Heading>
            <IconButton
              aria-label="Search database"
              borderRadius="50%"
              icon={<AddIcon />}
              onClick={() => {
                setModalState('tasks');
                onOpen();
              }}
            />
          </Container>
          <Tabs>
            <TabList>
              <Tab>All</Tab>
              <Tab>Not started</Tab>
              <Tab>In progress</Tab>
              <Tab>Complete</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer>
                  <Table size="sm">
                    <Tbody>
                      <Tr>
                        <Td>
                          <form onSubmit={(e) => addTask(e)}>
                            <Input
                              variant="flushed"
                              autoFocus
                              placeholder="Add new task..."
                            />
                          </form>
                        </Td>
                      </Tr>
                      {userTasks &&
                        userTasks.map((task) => {
                          return (
                            <Tr key={task.id}>
                              <Td>{task.name}</Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table size="sm">
                    <Tbody>
                      {userTasks &&
                        userTasks
                          .filter((task) => task.status === 'Not Started')
                          .map((task) => {
                            return (
                              <Tr key={task.id}>
                                <Td>{task.name}</Td>
                              </Tr>
                            );
                          })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table size="sm">
                    <Tbody>
                      {userTasks &&
                        userTasks
                          .filter((task) => task.status === 'In Progress')
                          .map((task) => {
                            return (
                              <Tr key={task.id}>
                                <Td>{task.name}</Td>
                              </Tr>
                            );
                          })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table size="sm">
                    <Tbody>
                      {userTasks &&
                        userTasks
                          .filter((task) => task.status === 'Complete')
                          .map((task) => {
                            return (
                              <Tr key={task.id}>
                                <Td>{task.name}</Td>
                              </Tr>
                            );
                          })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
        <Container
          border="2px"
          borderRadius="5px"
          mt="3em"
          mb="3em"
          width="100%"
          maxWidth="100%">
          <Container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            maxWidth="100%">
            <Heading size="md" textAlign="left">
              Projects
            </Heading>
            <IconButton
              aria-label="Search database"
              borderRadius="50%"
              icon={<AddIcon />}
              onClick={() => {
                setModalState('projects');
                onOpen();
              }}
            />
          </Container>
          <ProjectsCarousel />
        </Container>
      </Container>

      {modalState === 'tasks' && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mw="60%">
            <ModalHeader margin="10px">New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewTaskForm setModalState={setModalState} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {modalState === 'projects' && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mw="60%">
            <ModalHeader margin="10px">New Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewProjectForm setModalState={setModalState} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
