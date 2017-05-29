import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink, Redirect } from 'react-router-dom';
import '../App.css';

export default class Landing extends Component {
  checkUserData() {
    this.props.logUserName(
      this.refs.username.value,
      this.refs.password.value
    );
  }

  renderLogInData() {
    if(this.props.loggedIn !== true) {
      return (
        <span>
          <div className="logInContainer"> 
            <h3 id="welcome">Welcome!</h3>
            <input type="text" id="usernameInput" placeholder="username" ref="username"/>
            <input type="password" placeholder="password" ref="password"/>      
            <NavLink onClick={this.props.clearError} to="/signup">Don't have an account? Sign Up!</NavLink><br/>
            <button type="button" className="btn btn-info btn-lg" onClick={() => this.checkUserData()}>Log In</button>
            <p id="signInError">{this.props.errorMessage}</p>
          </div>
        </span>
      );
    }
    return <Redirect to="/main"/>;
  }

  render() {
    return (
      <div className="bigBorder container">
          <div className="tempBorder">
            {this.renderLogInData()}
            <br />
            <div className="navButtons aboutMemedr">
              <NavLink onClick={this.props.clearError} to="/about"><button type="button" className="btn btn-info">About Memedr</button></NavLink>
            </div>
          </div>
      </div>
    );
  }
}