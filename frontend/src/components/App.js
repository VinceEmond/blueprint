import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
// import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Tasks from "./Tasks";
import TrelloTasks from "./Trello/TrelloTasks";
import TrelloProjects from "./Trello/TrelloProjects";
import Login from "./User/Login";
import Register from "./User/Register";
import LandingPage from "./LandingPage";
import Project from "./Project";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  // useEffect(() => {
  //   console.log("COOKIE HAS BEEN SET");
  // }, [cookies]);

  const loginHandler = (name, id) => {
    console.log("LOGIN");
    setCookie("name", name, { path: "/" });
    setCookie("id", id, { path: "/" });
  };

  const logoutHandler = (e) => {
    console.log("LOGOUT");
    removeCookie("name");
    removeCookie("id");
    // cookies.remove("name");
  };

  return (
    <div className="App">
      <ChakraProvider>
        <NavBar loginHandler={loginHandler} logoutHandler={logoutHandler} />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/trellotasks" element={<TrelloTasks />} />
            <Route path="/trelloprojects" element={<TrelloProjects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
