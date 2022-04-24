import React, { useContext, useState } from "react";
import "./App.css";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import Projects from "../Projects/Projects";
import Tasks from "../Tasks/Tasks";
import Project from "../Project/Project";
import AboutUs from "../AboutUs/AboutUs";
import Login from "../User/Login";
import Register from "../User/Register";
import { useSpeechRecognition } from "react-speech-recognition";
import { usersContext } from "../../Providers/UsersProvider";

function App() {
  const [redirectUrl, setRedirectUrl] = useState("");
  const { cookies } = useContext(usersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState(null);

  const commands = [
    {
      command: ["open *", "go to *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: [/.*add.*task.*/, /.*new.*task.*/, /.*create.*task.*/],
      callback: (speech) => {
        console.log(window.location.pathname);
        const currentURL = window.location.pathname;
        if (currentURL === "projects" || currentURL === "project") {
          return;
        }
        console.log("Testing");
        setTimeout(() => {
          resetTranscript();
        }, 3000);
        setModalState("tasks");
        onOpen();
      },
    },
    {
      command: [/.*add.*project.*/, /.*new.*project.*/, /.*create.*project.*/],
      callback: (speech) => {
        console.log(speech.command);
        const currentURL = window.location.pathname;
        if (currentURL === "tasks") {
          return;
        }
        setTimeout(() => {
          resetTranscript();
        }, 3000);
        setModalState("projects");
        onOpen();
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const pages = ["home", "welcome", "about us", "projects", "tasks"];

  const urls = {
    home: "/welcome",
    welcome: "/",
    "about us": "/aboutus",
    projects: "/projects",
    tasks: "/tasks",
  };

  let redirect = "";

  const loggedIn = () => {
    return cookies.id ? false : <LandingPage />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ChakraProvider>
          <NavBar transcript={transcript} resetTranscript={resetTranscript} />
          {redirectUrl && pages.includes(redirectUrl) && (
            <Navigate to={urls[redirectUrl]} />
          )}

          <div className="content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/welcome"
                element={
                  loggedIn() || (
                    <Dashboard
                      modalState={modalState}
                      setModalState={setModalState}
                      isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    />
                  )
                }
              />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route
                path="/projects"
                element={
                  loggedIn() || (
                    <Projects
                      modalState={modalState}
                      setModalState={setModalState}
                      isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    />
                  )
                }
              />
              <Route
                path="/projects/:id"
                element={
                  loggedIn() || (
                    <Project
                      modalState={modalState}
                      setModalState={setModalState}
                      isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    />
                  )
                }
              />
              <Route
                path="/tasks"
                element={
                  loggedIn() || (
                    <Tasks
                      modalState={modalState}
                      setModalState={setModalState}
                      isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    />
                  )
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          {redirect && setRedirectUrl(null)}
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
