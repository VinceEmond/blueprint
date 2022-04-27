import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const projectsContext = createContext();

export default function ProjectsProvider(props) {
  const [userProjects, setUserProjects] = useState([]);

  // Retrieve all tasks (eventually user specific tasks)
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        const allProjects = response.data.projects;
        setUserProjects(allProjects);
        // console.log("ALLPROJECTS: ", allProjects);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  const projectData = { userProjects, setUserProjects };

  return (
    <projectsContext.Provider value={projectData}>
      {props.children}
    </projectsContext.Provider>
  );
}
