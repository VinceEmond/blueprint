import { AddIcon } from "@chakra-ui/icons";
import { tasksContext } from "../../Providers/TasksProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { useContext } from "react";
import { updateUserTaskStatus } from "../../helpers/selectors";
import axios from "axios";
import moment from "moment";
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
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

////////////////////////////////////////////////////////
// DELETE THIS ONCE IT'S AVAILABLE IN HELPER FUNCTION //
////////////////////////////////////////////////////////
function displayServerError(error) {
  console.log("Server Error:", error);
}

export default function Tasks({ setModalState, onOpen, onEdit }) {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { cookies } = useContext(usersContext);
  const PROJECT_ID = 1;
  const PRIORITY = "Low";
  const CURRENT_USER_ID = Number(cookies.id);
  const DESCRIPTION = "";
  const START_DATE = moment(new Date()).format("YYYY-MM-DD");
  const DUE_DATE = moment(new Date()).add(2, "days").format("YYYY-MM-DD");
  const MODIFIED_DATE = moment(new Date()).format("YYYY-MM-DD");
  const CATEGORY_ID = 1;

  // Onsubmit helper function for add tasks
  function addTask(e, filter = "Not Started") {
    e.preventDefault();
    const newTask = e.target[0].value.trim();
    e.target[0].value = "";
    if (newTask) {
      const taskFormValues = {
        project_id: PROJECT_ID,
        priority: PRIORITY,
        assignee_id: CURRENT_USER_ID,
        name: newTask,
        description: DESCRIPTION,
        start_date: START_DATE,
        due_date: DUE_DATE,
        modified_date: MODIFIED_DATE,
        status: filter,
        category_id: CATEGORY_ID,
      };

      axios
        .post("/api/tasks", taskFormValues)
        .then((response) => {
          const returnedTask = response.data.task[0];
          setUserTasks((prev) => {
            return [...prev, returnedTask];
          });
          console.log("Succesfully added new Task to database");
        })
        .catch((error) => displayServerError(error));
    }
  }

  function tabPanel(tasks, filter = "Not Started") {
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
            </Tbody>
          </Table>
          <Table size="sm">
            <Tbody>{tasks}</Tbody>
          </Table>
        </TableContainer>
      </TabPanel>
    );
  }

  function checkClick(e, id) {
    const updatedTasks = updateUserTaskStatus(userTasks, id, e.target.checked);

    const filteredTasks = updatedTasks.filter((project) => {
      return project.id === id;
    });

    axios
      .put(`/api/tasks/${id}`, filteredTasks[0])
      .then(() => {
        setUserTasks(updatedTasks);
      })
      .catch((error) => displayServerError(error));
  }

  function tabList(filter = "all") {
    const userSpecificTasks = userTasks.filter(
      (task) => task.assignee_id === CURRENT_USER_ID
    );
    return userSpecificTasks
      .filter(
        (task) =>
          task.status === filter ||
          (filter === "all" && task.status !== "Complete")
      )
      .map((task) => {
        const key = `${filter}+${task.id}`;
        const checkValues = task.status === "Complete" ? [task.id] : [];
        return (
          <Tr key={key}>
            <Td width="5px" padding="2px">
              <CheckboxGroup value={checkValues}>
                <Checkbox
                  value={task.id}
                  onChange={(e) => checkClick(e, task.id)}
                ></Checkbox>
              </CheckboxGroup>
            </Td>
            <Td onClick={(e) => onEdit(task)} padding="7px">
              {task.name}
            </Td>
          </Tr>
        );
      });
  }

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
