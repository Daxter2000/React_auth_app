import React, { Component } from 'react';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';

export default class App extends Component {
  constructor() {  super()
  
  this.state = {
    status: "NOT_LOGGED_IN",
    user: {}
  }

  this.handleLogin = this.handleLogin.bind(this)
}
  handleLogin(data){
    this.setState(
      {
      status:"LOGGED_IN",
      user: data.user
      })
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <Routes>
            <Route path="/" element={<Home status={this.state.status} handleLogin={this.handleLogin}/>}/>
            <Route path="/dashboard" element={<Dashboard status={this.state.status}/>}/>
          </Routes>
        </Router>

      </div>
    );
  }
}