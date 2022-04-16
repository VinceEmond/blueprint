import './App.css';
import NavBar from './NavBar';
import { ChakraProvider, Switch } from '@chakra-ui/react';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Tasks from './Tasks';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ChakraProvider>
          <NavBar />
          <h1>RENDERED HERE</h1>

          <div className="content">
            <Switch>
              <Route exact path="/Dashboard" component={Dashboard} />
              <Route path="/Projects" component={Projects} />
              <Route path="/TAsks" component={Tasks} />
            </Switch>
          </div>

          <Dashboard />
        </ChakraProvider>
      </HashRouter>
    </div>
  );
}

export default App;
