import React, { Component } from 'react';

export default class UserStatus extends Component {
  
  renderLogInData() {
      let text = !this.props.loggedIn ? "False" : "True";
      return <h3>Login Status: {text}</h3>;
    /*if(this.props.loggedIn !== true) {
     return (
        <span>
          <p>User Name: <input type="text" ref="username"/></p>
          <p>Password: <input type="text" ref="password"/></p>
            
          <br/><button onClick={() => this.checkUserData()}>Log In</button>
          <br/><a href="/">Forgot your Password?</a>
          <br/><a href="/signup">Sign Up</a>
        </span>
      );
    }

    else {
      return (
        <span>
          <p>All Set! Enjoy Memedr!</p>
        </span>
      );
    }*/
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