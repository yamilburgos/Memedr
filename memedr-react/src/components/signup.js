import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends Component {  
  newUserData() {
    axios.post("https://memedr.herokuapp.com/auth/register", {
        username: this.refs.username.value,
        password: this.refs.password.value,
        email: this.refs.email.value,
        location: this.refs.location.value,
        gender:  this.refs.gender.value,
        profile_image: this.refs.image.value,
        age: this.refs.age.value
    }).then(function (response) { 
           console.log("Something was sent", response);
           window.location = "./main";
      }).catch(function(response) {
           console.log("Error:", response); 
      });
  }

  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <p>User Name: <input type="text" ref="username" name="username"/></p>
            <p>Email: <input type="text" ref="email" name="email"/></p>
            <p>Password: <input type="text" ref="password" name="password" /></p>

            <p>Location: <select name="location" ref="location">
                <option value="queens">Queens</option>
                <option value="manhattan">Manhattan</option>
                <option value="statenisland">Staten Island</option>
                <option value="brookyln">Brooklyn</option>
                <option value="bronx">Bronx</option>
            </select></p>

            <p>Sex: <select name="gender" ref="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select></p>

            <p>Profile Image: </p> <input type="text" ref="image" name="profile_image"/>

            <p>Are you 18 years or older? <input type="number" ref="age" name="age"/></p>
            <p>Did you read the Terms of Service? <input type="checkbox"/></p>
            
            <br/><button onClick={() => this.newUserData()}>Create Account</button>
          </div>
      </div>
    );
  }
}