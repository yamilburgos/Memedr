import React, { Component } from 'react';
import axios from 'axios'
export default class Matches extends Component {
  
  componentDidMount(){
    let id = this.props.userID
    // let id = 1
    axios.get("https://memedr.herokuapp.com/users/profile/matches/" + id, {
      id:id
    })
    .then((res) => {
      console.log(res)
      res.data.data.map((element, index) => {
        // GRAB MATCHES UL FROM THE DOCUMENT
        let matchesUL = document.querySelector("#matchesUL");
        // CREATE MATCHES DIV ELEMENT
        let matchesDiv = document.createElement('div');
        // CREATE IMG AND ADD USER PROFILE URL
        let profilePic = document.createElement('img');
        profilePic.setAttribute('src', element.profile_image);
        // CREATE P TAG AND ADD USER NAME
        let userName = document.createElement('p');
        userName.innerHTML = element.username
        // CREATE P TAG AND ADD LOCATION
        let location = document.createElement('p');
        location.innerHTML = element.location
        // CREATE P TAG AND ADD EMAIL
        // let email = document.createElement('p');
        // email.innerHTML = element.email;
        // APPEND  NEW ELEMENTS IMG AND TAGS TO DIV
        matchesDiv.appendChild(profilePic);
        matchesDiv.appendChild(userName);
        matchesDiv.appendChild(location);
        // matchesDiv.appendChild(email);
        // APPEND DIV TO MATCHES UL 
        matchesUL.appendChild(matchesDiv);
      });
    })
    .catch((err) => {
      console.log(err)
    })
   };


  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
            <ul id="matchesUL"></ul>
          </div>
      </div>
    );
  }
}