import './App.css';
import NavBar from './NavBar';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Project from './Project';
import Tasks from './Tasks';

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
          </Routes>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
