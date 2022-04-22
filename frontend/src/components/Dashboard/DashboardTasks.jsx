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
import { tasksContext } from "../../Providers/TasksProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { useContext } from "react";
import axios from "axios";

export default function Tasks({ setModalState, onOpen, onEdit }) {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { cookies } = useContext(usersContext);

  // Onsubmit helper function for add tasks
  const addTask = (e, filter = "Not Started") => {
    e.preventDefault();
    const newTask = e.target[0].value.trim();
    e.target[0].value = "";
    if (newTask) {
      const taskFormValues = {
        name: newTask,
        status: filter,
        project_id: 1,
        assignee_id: Number(cookies.id),
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
    const userSpecificTasks = userTasks.filter(
      (task) => task.assignee_id === Number(cookies.id)
    );
    return userSpecificTasks
      .filter((task) => task.status === filter || filter === "all")
      .map((task) => {
        // For freshly rendered tasks, id will be undefined so make up temp key
        const key = `${filter}+${task.id || task.name.length * 1000}`;
        return (
          <Tr key={key} onClick={(e) => onEdit(task)}>
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
