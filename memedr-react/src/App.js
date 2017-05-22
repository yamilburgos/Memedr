import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// IMPORT COMPONENTS


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Memedr</h2>
        </div>
      </div>
    );
  }
}