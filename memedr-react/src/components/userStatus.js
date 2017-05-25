import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink } from 'react-router-dom';

export default class UserStatus extends Component {
  
  renderLogInData() {
    if(this.props.loggedIn !== true) {
     return (
        <div>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      );
    }

    return <h3>You are now Logged In!</h3>;
}

  render() {
    return (
      <div>
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>
          {this.renderLogInData()}
      </div>
    );
  }
}