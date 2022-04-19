import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  IconButton,
  Input,
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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function Tasks({ userTasks, addTask, setModalState, onOpen }) {
  return (
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
            setModalState("tasks");
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
                      .filter((task) => task.status === "Not Started")
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
                      .filter((task) => task.status === "In Progress")
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
                      .filter((task) => task.status === "Complete")
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
  );
}
