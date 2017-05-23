import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <p>User Name: <input type="text" id="userValue"/></p>
            <p>Password: <input type="text" id="passwordValue"/></p>
            
            <br/><button>Log In</button>
            <br/><a href="#">Forgot your Password?</a>

            <br/><a href="#">Sign Up</a>
            <br/><button>About</button>
          </div>
      </div>
    );
  }
}