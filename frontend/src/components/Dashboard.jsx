import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Center,
  LinkBox,
  LinkOverlay,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { getUserName } from '../helpers/selectors';
import { set } from 'lodash';

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState('');
  const [userTasks, setUserTasks] = useState([]);
  let loading = false;

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('/api/users')
      .then((response) => {
        const allUsers = response.data.users;
        setUserData(allUsers);
        // console.log("allUsers: ", allUsers);
        const specificUser = getUserName(userData, 1);
        setUserName(specificUser);

        return () => {
          controller.abort();
        };
      })
      .catch((err) => console.log('err:', err));
  }, [userName]);

  // For now get all tasks, eventually get user specific tasks
  useEffect(() => {
    if (!loading) {
      loading = true;
      axios
        .get('/api/tasks')
        .then((response) => {
          const allTasks = response.data.tasks;
          setUserTasks(allTasks);
          console.log('allUsers: ', allTasks);
          return () => {};
        })
        .catch((err) => console.log('err:', err));
    }
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

      <Container border="2px" borderRadius="5px">
        <Heading size="sm" textAlign="left">
          My Priorities
        </Heading>
        <Tabs>
          <TabList>
            <Tab>All</Tab>
            <Tab>Not started</Tab>
            <Tab>In progress</Tab>
            <Tab>Complete</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>List all here</p>
              <ul>
                {userTasks.map((task) => {
                  return <li key={task.id}>{task.name}</li>;
                })}
              </ul>
            </TabPanel>
            <TabPanel>
              <p>Not started</p>
            </TabPanel>
            <TabPanel>
              <p>In progress</p>
            </TabPanel>
            <TabPanel>
              <p>Complete</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
}
