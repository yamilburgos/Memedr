import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.userData;
  }

  handleDeleteAccount() {
    var x = window.confirm("Are you sure you want to delete your account?")
    if(x){
      window.alert("Account Deleted")
      let id = this.props.userData.id;
      axios.delete("https://memedr.herokuapp.com/users/profile/delete/" + id)
        .catch((err) => {
          return err
        })
      console.log('account delete')
      window.location.href = "http://localhost:3000/"
    }
  }

  handleUpdateAccount() {
      let id = this.props.userData.id;
      console.log(id);
      console.log('account update');

      axios.put("https://memedr.herokuapp.com/users/profile/update/" + id, {
            id: id,
            updatedUsername: this.refs.username.value,
            updatedEmail: this.refs.email.value,
            updatedLocation: this.refs.location.value,
            updatedGender: this.refs.gender.value,
            updatedImage: this.refs.profile_image.value,
            updatedAge: this.refs.age.value,
      }).catch((err) => { return err; });
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          <br />
          <button>Matches</button>
          <button>Saves</button>
          <button>Main</button>

          <br />
          <img src={this.props.userData.profile_image} className="profileImage" alt="profileImage.jpg"></img>
          <p>Profile Image: <input type="text" ref="profile_image" placeholder={this.props.userData.profile_image} /></p>
          <p>Username: <input type="text" ref="username" placeholder={this.props.userData.username} /></p>
          <p>Email: <input type="text" ref="email" placeholder={this.props.userData.email} /></p>
          <p>Location: <input type="text" ref="location" placeholder={this.props.userData.profile_image} /></p>
          <p>Gender: <input type="text" ref="gender" placeholder={this.props.userData.gender} /></p>
          <p>Age: <input type="text" ref="age" placeholder={this.props.userData.age} /></p>
          <br />
          <br />
          <button onClick={this.handleUpdateAccount.bind(this)}> update account </button>
          <button onClick={this.handleDeleteAccount.bind(this)}> delete account </button>
        </div>
      </div>
    );
  }
}