import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, Redirect, NavLink } from 'react-router-dom';
import '../App.css';

export default class SignUp extends Component {
  newUserData() {
    this.props.setUserName([
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
    if (this.props.loggedIn) {
      return <Redirect to="/profile" />;
    }
      
    return (
      <div className="container">
      <div>
        <p>username <input required type="text" ref="username" /></p>
        <p>email <input type="email" ref="email" /></p>
        <p>password <input type="password" ref="password" /></p>

        <p>location <select ref="location">
          <option value="queens">Queens</option>
          <option value="manhattan">Manhattan</option>
          <option value="statenisland">Staten Island</option>
          <option value="brookyln">Brooklyn</option>
          <option value="bronx">Bronx</option>
        </select></p>

        <p>gender <select ref="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select></p>

        <p>profile image link </p> <input type="url" ref="image" defaultValue="https://memedr.herokuapp.com/images/default.jpg" />
        <p>age ( must be 18 + ) <input type="number" ref="age"  min="18" max="100" /></p>
        <p>Did you read the Terms of Service? <input type="checkbox" /></p>

        <button className="btn btn-primary createAccountButton" onClick={() => this.newUserData()}>Create Account</button>
        <p>{this.props.errorMessage}</p>
      </div>
      </div>
    );
  }

  render() {
    return (
      <div className="bigBorder container">
        <div className="signUpDiv profileContainer">
           {this.renderSignUpData()}
          <div className="navButtons">
            <NavLink to="/"><button className="btn btn-info homeButtonInAbout" type="submit">home</button></NavLink>
          </div>
        </div>
      </div>
    );
  }
}