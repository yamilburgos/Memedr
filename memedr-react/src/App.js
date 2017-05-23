import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
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
        <Landing/>
        <About/>
        <SignUp/>
        <Profile/>
        <Main/>
        <Matches/>
      </div>
    );
  }
}