import React, { Component } from 'react';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </Router>

      </div>
    );
  }
}