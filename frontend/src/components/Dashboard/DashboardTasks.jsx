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
  const tabFilters = ["Not Started", "In Progress", "Pending", "Complete"];

  const currentTab = (tasks, filter = "Not Started", key) => {
    return (
      <TabPanel key={key}>
        <TableContainer>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td>
                  <form onSubmit={(e) => addTask(e, filter)}>
                    <Input
                      variant="flushed"
                      autoFocus
                      placeholder="Add new task..."
                    />
                  </form>
                </Td>
              </Tr>
              {tasks}
            </Tbody>
          </Table>
        </TableContainer>
      </TabPanel>
    );
  };

  const tabLists = () => {
    const currentTabs = [];
    currentTabs.push({
      tasks: userTasks.map((task) => {
        return (
          <Tr key={`${task.id}`}>
            <Td>{task.name}</Td>
          </Tr>
        );
      }),
      key: "all",
    });
    for (const filter of tabFilters) {
      currentTabs.push({
        tasks: userTasks
          .filter((task) => task.status === filter)
          .map((task) => {
            return (
              <Tr key={`${filter} ${task.id}`}>
                <Td>{task.name}</Td>
              </Tr>
            );
          }),
        filter: filter,
        key: filter,
      });
    }
    return currentTabs.map((tab, index) =>
      currentTab(tab.tasks, tab.filter, index)
    );
  };

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
        <TabPanels>{userTasks && tabLists()}</TabPanels>
      </Tabs>
    </Container>
  );
}
