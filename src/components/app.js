import React, { Component } from 'react';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import Home from './Home';

export default class App extends Component {
  constructor() {  super()
  
  this.state = {
    status: "NOT_LOGGED_IN",
    user: {}
  }

  this.handleLogin = this.handleLogin.bind(this)
  this.handleLoggedOut = this.handleLoggedOut.bind(this)

  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  checkLoginStatus(){
    axios.get("http://localhost:3000/logged_in", {withCredentials: true})
    .then(response => {
      if (response.data.logged_in && this.state.status ==='NOT_LOGGED_IN'){
        this.setState({
          status: "LOGGED_IN",
          user: response.data.user
        })
      }
      else if (!response.data.logged_in && this.state.status==="LOGGED_IN"){
        this.setState({
          status: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(e => {console.log("Check errors", e)})
  }


  handleLogin(data){
    this.setState(
      {
      status:"LOGGED_IN",
      user: data.user
      })
  }

  handleLoggedOut(){
    this.setState({
      status:"NOT_LOGGED_IN",
      user: {}
    })
  }



  
  render() {
    return (
      <div className='app'>
        <Router>
          <Routes>
            <Route path="/" element={<Home status={this.state.status} handleLogin={this.handleLogin} handleLoggedOut={this.handleLoggedOut}/>}/>
            <Route path="/dashboard" element={<Dashboard status={this.state.status}/>}/>
          </Routes>
        </Router>

      </div>
    );
  }
}