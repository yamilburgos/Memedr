import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

export default class SignUp extends Component {
  render() {
    return (
      <div className="bigBoarder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <p>User Name: </p>
            <input type="text"/>
            <p>Email: </p>
            <input type="text"/>

            <p>Password: </p>
            <input type="text"/>
            <p>Confirm Password: </p>
            <input type="text"/>

            <p>Location: </p> <select name="location">
                <option value="queens">Queens</option>
                <option value="manhattan">Manhattan</option>
                <option value="statenisland">Staten Island</option>
                <option value="brookyln">Brooklyn</option>
                <option value="bronx">Bronx</option>
            </select>

            <p>Sex: </p> <select name="sex">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <p>Profile Image: </p> <input type="text"/>

            <p>Are you 18 years or older? <input type="checkbox"/></p>
            <p>Did you read the Terms of Service? <input type="checkbox"/></p>
            
            <br/><button>Log In</button>
            <br/><a href="#">Forgot your Password?</a>

            <br/><button>Create Account</button>
          </div>

      </div>
    );
  }
}