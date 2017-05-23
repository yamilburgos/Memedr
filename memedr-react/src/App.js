import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// IMPORT COMPONENTS
import Landing from './components/landing';
import About from "./components/about";

export default class App extends Component {
  render() {
    return (
      <div className="App-header">
        <Landing/>
        <About/>
      </div>
    );
  }
}