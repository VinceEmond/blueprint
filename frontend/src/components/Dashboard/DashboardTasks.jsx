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
import { AddIcon } from "@chakra-ui/icons";
import { tasksContext } from "../../Providers/TasksProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { useContext, useEffect } from "react";
import { updateUserTaskStatus } from "../../helpers/selectors";
import axios from "axios";
import moment from "moment";

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
        project_id: 1,
        priority: "Low",
        assignee_id: Number(cookies.id),
        name: newTask,
        description: "",
        start_date: moment(new Date()).format("YYYY-MM-DD"),
        due_date: moment(new Date()).add(2, "days").format("YYYY-MM-DD"),
        modified_date: moment(new Date()).format("YYYY-MM-DD"),
        status: filter,
        category_id: 1,
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
            </Tbody>
          </Table>
          <Table size="sm">
            <Tbody>{tasks}</Tbody>
          </Table>
        </TableContainer>
      </TabPanel>
    );
  };

  function checkClick(e, id) {
    console.log("id", id);
    console.log("CHECKBOX CLICKED", e.target.checked);

    const updatedTasks = updateUserTaskStatus(userTasks, id, e.target.checked);

    const filteredTasks = updatedTasks.filter((project) => {
      return project.id === id;
    });

    // console.log("FILTEREDPROJECT: ", filteredTasks);

    axios.put(`/api/tasks/${id}`, filteredTasks[0]).then(() => {
      // console.log("SUCCESSFUL!");
      setUserTasks(updatedTasks);
    });
  }

  const tabList = (filter = "all") => {
    const userSpecificTasks = userTasks.filter(
      (task) => task.assignee_id === Number(cookies.id)
    );
    return userSpecificTasks
      .filter(
        (task) =>
          task.status === filter ||
          (filter === "all" && task.status !== "Complete")
      )
      .map((task) => {
        // For freshly rendered tasks, id will be undefined so make up temp key
        const key = `${filter}+${task.id || task.name.length * 1000}`;

        let generatedDefaultValue = [];
        function defaultChecks() {
          if (task.status === "Complete") {
            generatedDefaultValue.push(task.id);
          }
          return generatedDefaultValue;
        }
        const checkValues = defaultChecks();

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
