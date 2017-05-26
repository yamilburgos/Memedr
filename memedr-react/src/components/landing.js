import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, Redirect } from 'react-router-dom';

export default class Landing extends Component {
  checkUserData() {
    this.props.appData(
      this.refs.username.value,
      this.refs.password.value
    );
  }

  renderLogInData() {
    if(this.props.loggedIn !== true) {
     return (
        <span>
          <p>User Name: <input type="text" ref="username"/></p>
          <p>Password: <input type="text" ref="password"/></p>      
          <br/><button onClick={() => this.checkUserData()}>Log In</button>
          {/*<br/><a href="/">Forgot your Password?</a>*/}
        </span>
      );
    }
    
    return <Redirect to="/main"/>;
  }

  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
            {this.renderLogInData()}
            <NavLink to="/about"><button>About Us</button></NavLink>
          </div>
      </div>
    );
  }
}