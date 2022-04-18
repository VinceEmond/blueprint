import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
// import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Tasks from "./Tasks";
import Trello from "./Trello/Trello";
import LandingPage from "./LandingPage";
import Project from "./Project";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <NavBar />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/trello" element={<Trello />} />
          </Routes>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
