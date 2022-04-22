import React, { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Tasks from "./Tasks";
import Project from "./Project";
import AboutUs from "./AboutUs/AboutUs";
import Login from "./User/Login";
import Register from "./User/Register";
import { useCookies } from "react-cookie";
import { useSpeechRecognition } from "react-speech-recognition";
import SortTable from "./Tables/SortTable";

// let taskButton = document.querySelectorAll("div.css-1n0cvlj > button");

// let projectButton = document.querySelectorAll("div.css-1mrikgh > button");

// function taskClick() {
//   taskButton.click();
// }
// function projectClick() {
//   projectButton.click();
// }

function App() {
  // const [cookies, setCookie, removeCookie] = useCookies(null);

  const [redirectUrl, setRedirectUrl] = useState("");

  const commands = [
    {
      command: ["Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    // {
    //   command: "add task",
    //   callback: () => {
    //     taskClick();
    //   },
    // },
    // {
    //   command: "add project",
    //   callback: () => {
    //     projectClick();
    //   },
    // },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const pages = ["home", "welcome", "about us", "projects", "tasks"];

  const urls = {
    home: "/",
    welcome: "/welcome",
    "about us": "/aboutus",
    projects: "/projects",
    tasks: "/tasks",
  };

  // if speech recognition is not supported, won't do anything
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }

  // continous speech recognition
  // if (SpeechRecognition.browserSupportsContinuousListening) {
  //   SpeechRecognition.startListening({ continuous: true })
  // } else {
  //   return
  // }

  let redirect = "";

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
              <Route path="/" element={<Dashboard />} />
              <Route path="/welcome" element={<LandingPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/table" element={<SortTable />} />
            </Routes>
          </div>
          {redirect && setRedirectUrl(null)}
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
