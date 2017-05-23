import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

export default class Profile extends Component {
  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <br/>
            <button>Matches</button>
            <button>Saves</button>
            <button>Main</button>

            <br/>
            <p>Profile Image: </p>
            <p>User Name: Here's Johnnny</p>
            <p>Email: johnny.smith@gmail.com</p>
            <p>Location: Brooklyn</p>
            <p>Sex: Other</p>
            
            <br/><button>Edit Profile</button>
            <br/><button>Change Password</button>

            <br/><a href="#">Delete Account (Null account entry)</a>
          </div>
      </div>
    );
  }
}