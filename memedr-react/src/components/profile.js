import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.userData);
  }

  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
            <br/>
            <button>Matches</button>
            <button>Saves</button>
            <button>Main</button>

            <br/>
            <img src={this.props.userData.profile_image} alt="profileImage.jpg"></img>
            <p>User Name: {this.props.userData.username}</p>
            <p>Email: {this.props.userData.email}</p>
            <p>Location: {this.props.userData.location}</p>
            <p>Gender: {this.props.userData.gender}</p>
            
            <br/><button>Edit Profile</button>
            <br/><button>Change Password</button>

            <br/><a href="/profile">Delete Account (Null account entry)</a>
          </div>
      </div>
    );
  }
}