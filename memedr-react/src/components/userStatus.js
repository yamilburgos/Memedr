import React, { Component } from 'react';

export default class UserStatus extends Component {
  renderLogInData() {
    if(this.props.userlogStatus !== true) {
      return <button>{this.props.signUp}</button>;
    }

    return <button onClick={() => this.props.logout()}>LogOut</button>;
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