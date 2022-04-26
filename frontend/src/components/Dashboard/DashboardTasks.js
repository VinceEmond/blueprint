import { AddIcon } from "@chakra-ui/icons";
import { tasksContext } from "../../Providers/TasksProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { useContext, useEffect, useState } from "react";
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
  // Checkbox,
  // CheckboxGroup,
} from "@chakra-ui/react";
import CheckBox from "react-animated-checkbox";

function displayServerError(error) {
  console.log("Server Error:", error);
}

export default function Tasks({ setModalState, onOpen, onEdit }) {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { cookies } = useContext(usersContext);
  const [checkedState, setCheckedState] = useState({
    all: [],
    "Not Started": [],
    "In Progress": [],
    Pending: [],
    Complete: [],
  });
  const [checkedStateNotStarted, setCheckedStateNotStarted] = useState([]);
  const [checkedStateInProgress, setCheckedStateInProgress] = useState([]);
  const [checkedStateComplete, setCheckedStateComplete] = useState([]);
  const PROJECT_ID = 1;
  const PRIORITY = "Low";
  const CURRENT_USER_ID = Number(cookies.id);
  const DESCRIPTION = "";
  const START_DATE = moment(new Date()).format("YYYY-MM-DD");
  const DUE_DATE = moment(new Date()).add(2, "days").format("YYYY-MM-DD");
  const MODIFIED_DATE = moment(new Date()).format("YYYY-MM-DD");
  const CATEGORY_ID = 1;
  const DASHBOARD_TAB_STYLE = {
    color: "white",
    // bg: "RGBA(242,171,39,0.4)",
    bg: "rgb(201, 142, 31,0.8)",
    borderRadius: "10px 10px 0 0",
    borderRight: "2px solid white",
    borderLeft: "2px solid white",
    borderTop: "2px solid white",
    marginBottom: "-1px",
  };
  const TAB_FONT_STYLE = { fontSize: "1.09em", fontWeight: "500" };
  const TAB_HEADINGS = ["all", "Not Started", "Pending", "Complete"];

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
        })
        .catch((error) => displayServerError(error));
    }
  }

  function tabPanel(tasks, filter = "Not Started", tabName) {
    return (
      <TabPanel
        style={{
          backgroundColor: "#0a171e",
          opacity: "1",
          borderRadius: `${tabName ? "0 10px 10px 10px" : "10px"}`,
          border: "2px solid white",
          // borderTop: "2px solid white",
          // boxShadow: "0 0 3px 2px white",
        }}
      >
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

  // function checkClick(e, id) {
  //   const updatedTasks = updateUserTaskStatus(userTasks, id, e.target.checked);

  //   const filteredTasks = updatedTasks.filter((project) => {
  //     return project.id === id;
  //   });

  //   axios
  //     .put(`/api/tasks/${id}`, filteredTasks[0])
  //     .then(() => {
  //       setUserTasks(updatedTasks);
  //     })
  //     .catch((error) => displayServerError(error));
  // }

  function handleCheckedValues() {
    const tempCheckedValues = {
      all: [],
      "Not Started": [],
      "In Progress": [],
      Pending: [],
      Complete: [],
    };
    for (const heading of TAB_HEADINGS) {
      const userSpecificTasks = userTasks.filter(
        (task) => task.assignee_id === CURRENT_USER_ID
      );
      const list = userSpecificTasks
        .filter(
          (task) =>
            task.status === heading ||
            (heading === "all" && task.status !== "Complete")
        )
        .map((task, index) => {
          const checked = task.status === "Complete" ? true : false;
          tempCheckedValues[heading].push(checked);
          return "nothing";
        });
    }
    setCheckedState(tempCheckedValues);
  }

  useEffect(() => {
    handleCheckedValues();
  }, [userTasks]);

  function checkClick(position, filter) {
    console.log("filter", filter);
    console.log("checkedState[filter]: ", checkedState[filter]);
    // if (!checkedState[filter]) {
    //   return;
    // }
    const updatedCheckedState = checkedState[filter].map((item, index) =>
      index === position ? !item : item
    );
    console.log("updatedCheckedState: ", updatedCheckedState);
    // console.log(position);
    setCheckedState((prev) => {
      return { ...prev, [filter]: [...updatedCheckedState] };
    });
  }

  function tabList(filter = "all") {
    const userSpecificTasks = userTasks.filter(
      (task) => task.assignee_id === CURRENT_USER_ID
    );
    const buildCheckedState = [];

    const list = userSpecificTasks
      .filter(
        (task) =>
          task.status === filter ||
          (filter === "all" && task.status !== "Complete")
      )
      .map((task, index) => {
        const key = `${filter}+${task.id}`;
        const checked = task.status === "Complete" ? true : false;
        // console.log(checked);
        buildCheckedState.push(checked);
        // console.log(buildCheckedState);

        // setCheckedState((prev) => [...prev, checked]);
        return (
          <Tr
            key={key}
            _hover={{
              backgroundColor: "rgba(3, 140, 140, 0.3)",
              cursor: "pointer",
            }}
          >
            <Td width="5px" padding="2px">
              {/* <CheckboxGroup value={checkValues}>
                <Checkbox
                  value={task.id}
                  onChange={(e) => checkClick(e, task.id)}
                ></Checkbox>
              </CheckboxGroup> */}

              <CheckBox
                checked={checkedState[filter][index] || false}
                checkBoxStyle={{
                  checkedColor: "#34b93d",
                  size: 100,
                  unCheckedColor: "#b8b8b8",
                }}
                duration={400}
                onClick={(e) => checkClick(index, filter)}
              />
            </Td>
            <Td
              onClick={(e) => onEdit(task)}
              padding="7px"
              style={{ fontSize: "1.02em", overflow: "hidden" }}
            >
              <span style={{ fontWeight: "bolder" }}>{`${task.name}`}</span>
              {task.description && <span>{` - ${task.description}`}</span>}
            </Td>
          </Tr>
        );
      });
    return list;
  }

  return (
    <Container
      width="100%"
      maxWidth="100%"
      border="2px solid white"
      borderRadius="2em"
      mt="4em"
      pb="1em"
      style={{
        backgroundColor: "rgba(10,23,30,0.8)",
        color: "white",
      }}
    >
      <Container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        maxWidth="100%"
        paddingTop="1rem"
      >
        <Heading fontSize="1.6em" textAlign="left" paddingBottom="12px">
          My Priorities
        </Heading>
        <IconButton
          aria-label="Add task"
          borderRadius="50%"
          border="2px solid white"
          backgroundColor="RGBA(242,171,39,0.8)"
          _hover={{
            bg: "RGBA(242,171,39,0.6)",
          }}
          _active={{
            bg: "RGBA(242,171,39,0.8)",
          }}
          icon={<AddIcon />}
          onClick={() => {
            setModalState("tasks");
            onOpen();
          }}
        />
      </Container>
      <Tabs>
        <TabList style={{ borderBottom: "none" }}>
          <Tab
            _focus={{ boxShadow: "none" }}
            _active={{ bg: "RGBA(242,171,39,0.5)" }}
            _selected={DASHBOARD_TAB_STYLE}
            style={TAB_FONT_STYLE}
          >
            All
          </Tab>
          {/* <Tab
            _focus={{ boxShadow: "none" }}
            _active={{ bg: "RGBA(242,171,39,0.5)" }}
            _selected={DASHBOARD_TAB_STYLE}
            style={TAB_FONT_STYLE}
          >
            Not started
          </Tab>
          <Tab
            _focus={{ boxShadow: "none" }}
            _active={{ bg: "RGBA(242,171,39,0.5)" }}
            _selected={DASHBOARD_TAB_STYLE}
            style={TAB_FONT_STYLE}
          >
            In progress
          </Tab>
          <Tab
            _focus={{ boxShadow: "none" }}
            _active={{ bg: "RGBA(242,171,39,0.5)" }}
            _selected={DASHBOARD_TAB_STYLE}
            style={TAB_FONT_STYLE}
          >
            Pending
          </Tab>
          <Tab
            _focus={{ boxShadow: "none" }}
            _active={{ bg: "RGBA(242,171,39,0.5)" }}
            _selected={DASHBOARD_TAB_STYLE}
            style={TAB_FONT_STYLE}
          >
            Complete
          </Tab> */}
        </TabList>
        <TabPanels>
          {userTasks && tabPanel(tabList(), "Not Started", "all")}
          {userTasks && tabPanel(tabList("Not Started"))}
          {userTasks && tabPanel(tabList("In Progress"), "In Progress")}
          {userTasks && tabPanel(tabList("Pending"), "Pending")}
          {userTasks && tabPanel(tabList("Complete"), "Complete")}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
