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
		       		<Route path="/" exact component={Landing}></Route>
		       		<Route path="/about" component={About}></Route>
		       		<Route path="/signup" component={SignUp}></Route>
		       		<Route path="/profile" component={Profile}></Route>
		       		<Route path="/main" component={Main}></Route>
		       		<Route path="/matches" component={Matches}></Route>
		       </Switch>
		      </div>
	      </Router>        

      </div>
    );
  }
}