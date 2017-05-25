import React, { Component } from 'react';

export default class SignUp extends Component {
  newUserData() {
    this.props.appData([
      this.refs.username.value,
      this.refs.password.value,
      this.refs.email.value,
      this.refs.location.value,
      this.refs.gender.value,
      this.refs.image.value,
      this.refs.age.value
    ]);
  }

  renderSignUpData() {
    if(!this.props.loggedIn) {
     return (
        <span>
            <p>User Name: <input type="text" ref="username"/></p>
            <p>Email: <input type="text" ref="email"/></p>
            <p>Password: <input type="text" ref="password"/></p>

            <p>Location: <select ref="location">
              <option value="queens">Queens</option>
              <option value="manhattan">Manhattan</option>
              <option value="statenisland">Staten Island</option>
              <option value="brookyln">Brooklyn</option>
              <option value="bronx">Bronx</option>
            </select></p>

            <p>Sex: <select ref="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
               <option value="other">Other</option>
            </select></p>

            <p>Profile Image: </p> <input type="text" ref="image"/>
            <p>Are you 18 years or older? <input type="number" ref="age"/></p>
            <p>Did you read the Terms of Service? <input type="checkbox"/></p>
            
            <br/><button onClick={() => this.newUserData()}>Create Account</button>
        </span>
      );
    }
  }

  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
            {this.renderSignUpData()}
          </div>
      </div>
    );
  }
}