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
      <span>
        <p>Username: <input type="text" ref="username" /></p>
        <p>Email: <input type="text" ref="email" /></p>
        <p>Password: <input type="text" ref="password" /></p>

        <p>Location: <select ref="location">
          <option value="queens">Queens</option>
          <option value="manhattan">Manhattan</option>
          <option value="statenisland">Staten Island</option>
          <option value="brookyln">Brooklyn</option>
          <option value="bronx">Bronx</option>
        </select></p>

        <p>Gender: <select ref="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select></p>

        <p>Profile Image: </p> <input type="text" ref="image" defaultValue="https://memedr.herokuapp.com/images/default.jpg" />
        <p>Are you 18 years or older? <input type="number" ref="age" /></p>
        <p>Did you read the Terms of Service? <input type="checkbox" /></p>

        <br /><button onClick={() => this.newUserData()}>Create Account</button>
        <p>{this.props.errorMessage}</p>
      </span>
    );
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          <NavLink to="/"><button className="btn btn-default homeButtonInAbout" type="submit">home</button></NavLink>
          {this.renderSignUpData()}
        </div>
      </div>
    );
  }
}