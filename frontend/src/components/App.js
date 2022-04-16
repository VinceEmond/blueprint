import "./App.css";
import NavBar from "./NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <NavBar />
        <h1>RENDERED HERE</h1>
        <Dashboard />
      </ChakraProvider>
    </div>
  );
}

export default App;
