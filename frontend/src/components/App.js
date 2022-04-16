import './App.css';
import NavBar from './NavBar';
import { ChakraProvider, Switch } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Tasks from './Tasks';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <NavBar />
        <h1>RENDERED HERE</h1>

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Tasks" element={<Tasks />} />
          </Routes>
        </div>

        {/* <Dashboard /> */}
      </ChakraProvider>
    </div>
  );
}

export default App;
