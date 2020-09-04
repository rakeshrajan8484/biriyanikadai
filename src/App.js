import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import './App.scss';
import Home from './Home';
 
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Home} />
         
      </div>
    </Router>
  );
}

export default App;
