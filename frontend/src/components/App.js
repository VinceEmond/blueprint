import "./App.css";
import NavBar from "./NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import Projects from "./Projects";
import Tasks from "./Tasks";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <NavBar />
        {/* <LandingPage /> */}
        <Dashboard />
        {/* <Projects /> */}
        {/* <Tasks /> */}
      </ChakraProvider>
    </div>
  );
}

export default App;
