import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);
        console.log(this.props.userData);

  }
    componentDidMount() {
      
  //   axios.get("").then((allData) => {
  //     //  this.setState({ logged: allData.data.results });
  //    });
   }

  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <br/>
            <button>Matches</button>
            <button>Saves</button>
            <button>Main</button>

            <br/>
            <img href={""}></img>
            <p>User Name: Here's Johnnny</p>
            <p>Email: johnny.smith@gmail.com</p>
            <p>Location: Brooklyn</p>
            <p>Gender: Other</p>
            
            <br/><button>Edit Profile</button>
            <br/><button>Change Password</button>

            <br/><a href="#">Delete Account (Null account entry)</a>
          </div>
      </div>
    );
  }
}