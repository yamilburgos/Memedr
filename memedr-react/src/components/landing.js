import React, { Component } from 'react';

export default class Landing extends Component {
  checkUserData() {
    this.props.appData(
      this.refs.username.value,
      this.refs.password.value
    );
  }

  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <p>User Name: <input type="text" ref="username"/></p>
            <p>Password: <input type="text" ref="password"/></p>
            
            <br/><button onClick={() => this.checkUserData()}>Log In</button>
            <br/><a href="/">Forgot your Password?</a>

            <br/><a href="/signup">Sign Up</a>
            <br/><button href="/about">About</button>
          </div>
      </div>
    );
  }
}