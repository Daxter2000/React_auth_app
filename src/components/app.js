import React, { Component } from 'react';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import Home from './Home';
import Login from './auth/Login';
import Registration from './auth/registration';


export default class App extends Component {
  constructor() {  super()
  
  this.state = {
    status: "NOT_LOGGED_IN",
    user: {},
    company: ""
    
  }

  this.handleLogin = this.handleLogin.bind(this)
  this.handleLoggedOut = this.handleLoggedOut.bind(this)
  this.checkCompany = this.checkCompany.bind(this)

  }

  componentDidMount(){
    this.checkLoginStatus();
    this.checkCompany();
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

  checkCompany(){
    axios.get("http://localhost:3000/company/get", {withCredentials:true})
      .then(response => {
        if(response.data.company == true) {
          this.setState({company: response.data.response.data[0].attributes})
        }else{
          this.setState({company: ""})
        }
        console.log(response)
      }  
        )
      .catch(e => {console.log("errors", e)})
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
      user: {},
      company: ""
    })
  }



  
  render() {
    return (
      <div className='app'>
        <Router>
          <Routes>
            <Route path="/sign_in" element={<Registration handleSuccesfullAuth={this.handleLogin} />}/>
            <Route path="/dashboard" element={<Dashboard status={this.state.status}/>}/>
            <Route path="/login" element={<Login handleSuccesfullAuth={this.handleLogin}/>}/>
            <Route path="/home" element={
              <Home 
              userStatus={this.state.status} 
              handleLoggedOut={this.handleLoggedOut}  
              checkCompany ={this.checkCompany}
              company ={this.state.company}
              />}
            />

          </Routes>
        </Router>

      </div>
    );
  }
}