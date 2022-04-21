import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const tasksContext = createContext();

export default function TasksProvider(props) {
  const [userTasks, setUserTasks] = useState([]);

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => {
        const allTasks = response.data.tasks;
        setUserTasks(usersTasks);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  const taskData = { userTasks, setUserTasks };

  return (
    <tasksContext.Provider value={taskData}>
      {props.children}
    </tasksContext.Provider>
  );
}
