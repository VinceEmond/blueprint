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
  const tabPanel = (tasks, filter = "Not Started") => {
    return (
      <TabPanel>
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

  const tabList = (filter = "all") => {
    return userTasks
      .filter((task) => task.status === filter || filter === "all")
      .map((task) => {
        // For freshly rendered tasks, id will be undefined so make up temp id
        const key = `${filter}+${task.id || task.name.length * 1000}`;
        return (
          <Tr key={key}>
            <Td>{task.name}</Td>
          </Tr>
        );
      });
  };

  return (
    <Container
      width="100%"
      maxWidth="100%"
      border="2px"
      borderRadius="5px"
      mt="4em"
    >
      <Container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        maxWidth="100%"
      >
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
          <Tab>Pending</Tab>
          <Tab>Complete</Tab>
        </TabList>
        <TabPanels>
          {userTasks && tabPanel(tabList())}
          {userTasks && tabPanel(tabList("Not Started"))}
          {userTasks && tabPanel(tabList("In Progress"), "In Progress")}
          {userTasks && tabPanel(tabList("Pending"), "Pending")}
          {userTasks && tabPanel(tabList("Complete"), "Complete")}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
