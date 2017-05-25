import React, { Component } from 'react';

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
    }
}

  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
            {this.renderLogInData()}
            <br/><form action="/about"><button>About</button></form>
          </div>
      </div>
    );
  }
}