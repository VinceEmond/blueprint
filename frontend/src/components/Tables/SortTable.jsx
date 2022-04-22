import React, { useContext } from "react";
import { useTable, useSortBy, useGroupBy, useExpanded } from "react-table";
import {
  Box,
  ChakraProvider,
  CSSReset,
  Center,
  Container,
  Checkbox,
} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
// import makeData from "./makeData";
import axios from "axios";
import moment from "moment";
import { getProjectName, updateUserTaskStatus } from "../../helpers/selectors";
import { usersContext } from "../../Providers/UsersProvider";
import { tasksContext } from "../../Providers/TasksProvider";
import { projectsContext } from "../../Providers/ProjectsProvider";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useGroupBy,
      useSortBy,
      useExpanded
    );
  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  // Render the UI for your table
  return (
    <>
      <Center>
        <Box
          as="table"
          border={1}
          borderStyle="solid"
          borderSpacing={0}
          size="lg"
          width="80%"
          {...getTableProps()}
        >
          <Box as="thead">
            {headerGroups.map((headerGroup) => (
              <Box as="tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Box
                    as="th"
                    m={0}
                    p="0.5rem"
                    borderBottom={1}
                    borderBottomStyle="solid"
                    borderRight={1}
                    borderRightStyle="solid"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <Box as="span">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Box as="tbody" {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <Box as="tr" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Box
                        as="td"
                        m={0}
                        p="0.5rem"
                        borderBottom={1}
                        borderBottomStyle="solid"
                        borderRight={1}
                        borderRightStyle="solid"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Center>
    </>
  );
}

export default function SortTable() {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { allUsers } = useContext(usersContext);
  const { userProjects } = useContext(projectsContext);
  const columns = React.useMemo(
    () => [
      {
        Header: "Complete",
        accessor: "complete",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Project Name",
        accessor: "projectname",
      },
      {
        Header: "Due Date",
        accessor: "duedate",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
    ],
    []
  );

  function checkClick(e, id) {
    // console.log("OLDSTATUS: ", item.status);
    // console.log("OLDITEM: ", item);
    // console.log("CHECKBOX CLICKED", e.target.checked);
    // console.log("CHECKBOX EVENT", e);
    // console.log("ITEMID CHECK", id);
    const updatedTasks = updateUserTaskStatus(userTasks, id, e.target.checked);

    const filteredTasks = updatedTasks.filter((project) => {
      return project.id === id;
    });
    // console.log("FILTEREDPROJECT: ", filteredTasks);
    // console.log("NEWSTATUS: ", item.status);
    // console.log("NEWITEM: ", item);

    axios.put(`/api/tasks/${id}`, filteredTasks[0]).then(() => {
      // console.log("SUCCESSFUL!");
      setUserTasks(updatedTasks);
    });
  }

  const data = userTasks.map((task) => {
    // console.log("TASK: ", task);
    let projectName = getProjectName(task.project_id, userProjects);
    let date = moment(task.due_date).utc().format("YYYY-MM-DD");
    return {
      complete: `${(
        <Checkbox
          ml="2em"
          value={task.name}
          onChange={(e) => checkClick(e, task.id)}
        ></Checkbox>
      )}`,
      name: task.name,
      projectname: projectName,
      duedate: date,
      status: task.status,
      priority: task.priority,
    };
  });

  // [
  //   {
  //     firstName: "Tom",
  //     lastName: "Ford",
  //     age: 23,
  //     visits: 42,
  //     progress: 25,
  //     status: "Single",
  //   },
  //   {
  //     firstName: "Tom1",
  //     lastName: "Ford1",
  //     age: 25,
  //     visits: 32,
  //     progress: 22,
  //     status: "Single",
  //   },
  //   ,
  // ];

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={5}>
        <Table columns={columns} data={data} />
      </Box>
    </ChakraProvider>
  );
}
