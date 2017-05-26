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
          <div className="logInContainer">
            <p>Username</p> 
            
            <input type="text" placeholder="username"ref="username"/>
            <p>Password</p> 
           
            <input type="text" ref="password"/>      
            
            <button type="button" className="btn btn-primary btn-lg" onClick={() => this.checkUserData()}>Log In</button>
            {/*<br/><a href="/">Forgot your Password?</a>*/}
          </div>
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
            <br />
            <NavLink to="/about"><button>About Us</button></NavLink>
          </div>
      </div>
    );
  }
}