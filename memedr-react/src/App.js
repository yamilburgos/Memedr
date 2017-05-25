import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// IMPORT COMPONENTS
import Landing from './components/landing';
import About from "./components/about";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Main from "./components/main";
import Matches from "./components/matches";

export default class App extends Component {
	constructor(props) {
    super(props);
    this.state = { loggedIn: false, response: [] };
  }

		landingComponent = () => {
      return (
        <Landing appData={this.loggingUserName.bind(this)}/>
      );
  }

	signupComponent = () => {
      return (
        <SignUp appData={this.settingUserName.bind(this)}/>
      );
  }

	profileComponent = () => {
      return (
        <Profile userData={this.state.response}/>
      );
  }

	loggingUserName(submittedName, submittedPassword) {
		console.log("Hello?", submittedName, submittedPassword);
		axios.post("https://memedr.herokuapp.com/auth/login", {
        username: submittedName,
        password: submittedPassword
    }).then((response) => {
					console.log(response);

					 this.setState({
						 	response: response.data.user_profile,
							loggedIn : response.data.loggedIn
						});
      }).catch(function(error) {
           console.log("Error:", error); 
      });
	}

	settingUserName(signupDataArray) {
		axios.post("https://memedr.herokuapp.com/auth/register", {
        username: signupDataArray[0],
        password: signupDataArray[1],
        email: signupDataArray[2],
        location: signupDataArray[3],
        gender:  signupDataArray[4],
        profile_image: signupDataArray[5],
        age: signupDataArray[6]
    }).then((response) => { 
					 this.setState({
						 	response: response.data.user_profile,
							loggedIn : response.data.loggedIn
						});
      }).catch(function(error) {
           console.log("Error:", error); 
      });
	}

  render() {
    return (
      <div className="App-header">
	     <Router>
	     	<div id="wrapper">
		        <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
		        <NavLink to="/about">About</NavLink>&nbsp;&nbsp;
		        <NavLink to="/signup">Sign Up</NavLink>&nbsp;&nbsp;
		        <NavLink to="/profile">Profile</NavLink>&nbsp;&nbsp;
		        <NavLink to="/main">Main</NavLink>&nbsp;&nbsp;
		        <NavLink to="/matches">Matches</NavLink>&nbsp;&nbsp;
		       <Switch>
							<Route path="/" exact render={() => this.landingComponent()}></Route>
		       		<Route path="/about" component={About}></Route>
							<Route path="/signup" render={() => this.signupComponent()}></Route>
							<Route path="/profile" render={() => this.profileComponent()}></Route>
		       		<Route path="/main" component={Main}></Route>
		       		<Route path="/matches" component={Matches}></Route>
		       </Switch>
		      </div>
	      </Router>
      </div>
    );
  }
}