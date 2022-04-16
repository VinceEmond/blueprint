import "./App.css";
import NavBar from "./NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import Projects from "./Projects";
import Tasks from "./Tasks";
import TestComponent from "./TestComponent";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <NavBar />
        {/* <TestComponent /> */}
        {/* <LandingPage /> */}
        <Dashboard />
        {/* <Projects /> */}
        {/* <Tasks /> */}
      </ChakraProvider>
    </div>
  );
}

export default App;
