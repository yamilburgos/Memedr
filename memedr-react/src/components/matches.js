import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Matches extends Component {  
  loadingAllMatches(){
    let id = this.props.userID;
    axios.get("https://memedr.herokuapp.com/users/profile/matches/" + id, {
      id:id
    })
    .then((res) => {
      if(res.status !== 500){
      res.data.data.map((element, index) => {
        // HIDES "NO MATCHES YET" 
        let noMatches = document.querySelector('#noMatches');
        noMatches.style.display = 'none';
        // GRAB MATCHES UL FROM THE DOCUMENT
        let matchesUL = document.querySelector("#matchesUL");
        // CREATE MATCHES DIV ELEMENT
        let matchesDiv = document.createElement('div');
        // CREATE IMG AND ADD USER PROFILE URL
        let profilePic = document.createElement('img');
        profilePic.setAttribute('src', element.profile_image);
        // CREATE P TAG AND ADD USER NAME
        let userName = document.createElement('p');
        userName.innerHTML = element.username;
        // CREATE P TAG AND ADD GENDER
        let gender = document.createElement('p');
        gender.innerHTML = element.gender;
        // CREATE P TAG AND ADD LOCATION
        let location = document.createElement('p');
        location.innerHTML = element.location;
        // CREATE P TAG AND ADD EMAIL
        let email = document.createElement('p');
        email.innerHTML = element.email;
        // CREATE P TAG AND ADD AGE
        let age = document.createElement('p');
        age.innerHTML = element.age;
        // APPEND  NEW ELEMENTS IMG AND TAGS TO DIV
        matchesDiv.appendChild(profilePic);
        matchesDiv.appendChild(userName);
        matchesDiv.appendChild(gender);
        matchesDiv.appendChild(location);
        matchesDiv.appendChild(email);
        matchesDiv.appendChild(age);
        // APPEND DIV TO MATCHES UL 
        matchesUL.appendChild(matchesDiv);
        // REACT WARNING EXPECTS A RETURN IN THIS FUNCTION
        return null;
      });
    }})
    .catch((err) => {
      console.log(err);
    });
   }

  checkUserStatus() {
    if (!this.props.loggedIn) {    
      return <Redirect to="/"/>;
    }

    return this.loadingAllMatches();
  }

  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
            {this.checkUserStatus()}
            <ul id="matchesUL">
            <li id="noMatches"> no matches yet</li>
            </ul>
          </div>
      </div>
    );
  }
}