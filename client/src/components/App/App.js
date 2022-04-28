import React, { useContext, useState, useEffect } from "react";
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
import Background from "../../assets/images/AdobeStock_409790026-70-highs.jpg";
import SpeechRecognition from "react-speech-recognition";
import Footer from "../Layout/Footer";

function App() {
  const [redirectUrl, setRedirectUrl] = useState("");
  const { cookies } = useContext(usersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState(null);
  const [voiceCommand, setVoiceCommand] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const commands = [
    {
      command: ["open *", "go to *"],
      callback: (redirectPage) => {
        setIsAccepted(true);

        setTimeout(() => {
          setIsAccepted(false);
          setModalState(null);
          setRedirectUrl(redirectPage);
        }, 1000);
      },
    },
    {
      command: [/.*add.*task.*/, /.*new.*task.*/, /.*create.*task.*/],
      callback: (speech) => {
        const currentURL = window.location.pathname;
        if (currentURL === "projects" || currentURL === "project") {
          return;
        }
        setIsAccepted(true);
        setTimeout(() => {
          setIsAccepted(false);
          setModalState(null);
          resetTranscript();
          setModalState("tasks");
          onOpen();
        }, 1000);
      },
    },
    {
      command: [/.*add.*project.*/, /.*new.*project.*/, /.*create.*project.*/],
      callback: (speech) => {
        const currentURL = window.location.pathname;
        if (currentURL === "tasks") {
          return;
        }
        setIsAccepted(true);
        setTimeout(() => {
          setIsAccepted(false);
          setModalState(null);
          resetTranscript();
          setModalState("projects");
          onOpen();
        }, 1000);
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const pages = ["home", "dashboard", "about us", "projects", "tasks"];

  const urls = {
    home: "/",
    dashboard: "/welcome",
    "about us": "/aboutus",
    projects: "/projects",
    tasks: "/tasks",
  };

  let redirect = "";

  const loggedIn = () => {
    return cookies.id ? false : <LandingPage />;
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "~") {
        setModalState("voice");
        onOpen();
        setVoiceCommand(true);
        SpeechRecognition.startListening();
      } else if (e.key === "\\") {
        SpeechRecognition.stopListening();
        resetTranscript();
        setModalState(null);
        setVoiceCommand(false);
      }
    });
  }, [resetTranscript]);

  return (
    <div className="App">
      <BrowserRouter>
        <ChakraProvider>
          <NavBar transcript={transcript} resetTranscript={resetTranscript} />
          {redirectUrl && pages.includes(redirectUrl) && (
            <Navigate to={urls[redirectUrl]} />
          )}

          <div
            className="content"
            height="fit-content"
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
              width: "100%",
              minHeight: "97vh",
              paddingTop: "3em",
              paddingBottom: "2em",
              backgroundRepeat: "no-repeat",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
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
                        transcript={transcript}
                        voiceCommand={voiceCommand}
                        isAccepted={isAccepted}
                        setIsAccepted={setIsAccepted}
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
                        transcript={transcript}
                        voiceCommand={voiceCommand}
                        isAccepted={isAccepted}
                        setIsAccepted={setIsAccepted}
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
                        transcript={transcript}
                        voiceCommand={voiceCommand}
                        isAccepted={isAccepted}
                        setIsAccepted={setIsAccepted}
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
                        transcript={transcript}
                        voiceCommand={voiceCommand}
                        isAccepted={isAccepted}
                        setIsAccepted={setIsAccepted}
                      />
                    )
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
            <Footer />
          </div>

          {redirect && setRedirectUrl(null)}
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
