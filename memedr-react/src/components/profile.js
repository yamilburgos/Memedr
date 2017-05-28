import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default class Profile extends Component {
  checkUserStatus() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
        <span>
          <br />
          <NavLink to="/main"><button className="btn btn-default" type="submit">Main</button></NavLink>
          <NavLink to="/matches"><button className="btn btn-default" type="submit">Matches</button></NavLink>
          <br />
          <img src={this.props.userData.profile_image} className="profileImage" alt={this.props.userData.username}></img>
          <p>Profile Image: <input type="text" ref="profile_image" defaultValue={this.props.userData.profile_image} /></p>
          <p>Username: <input type="text" ref="username" defaultValue={this.props.userData.username} /></p>
          <p>Email: <input type="text" ref="email" defaultValue={this.props.userData.email} /></p>
          <p>Location: <input type="text" ref="location" defaultValue={this.props.userData.location} /></p>
          <p>Gender: <input type="text" ref="gender" defaultValue={this.props.userData.gender} /></p>
          <p>Age: <input type="text" ref="age" defaultValue={this.props.userData.age} /></p>
          <br />
          <button onClick={this.handleUpdateAccount.bind(this)}> update account </button>
          <button onClick={this.handleDeleteAccount.bind(this)}> delete account </button>
        </span>
      );
  }

  handleDeleteAccount() {
    var x = window.confirm("Are you sure you want to delete your account?");
    if (x) {
      window.alert("Account Deleted");
      let id = this.props.userData.id;
      console.log("delete me, id: " + id);

      axios.delete("https://memedr.herokuapp.com/users/profile/delete/" + id)
        .catch((err) => {
          return err;
        })
      
      window.location.href = "https://memedrapp.herokuapp.com/";
    }
  }

  handleUpdateAccount() {
    var x = window.confirm("Are you sure you want to update your account?");
    if (x) {
      window.alert("Account Updated");
      let id = this.props.userData.id;

      axios.put("https://memedr.herokuapp.com/users/profile/update/" + id, {
        id: id,
        updatedUsername: this.refs.username.value,
        updatedEmail: this.refs.email.value,
        updatedLocation: this.refs.location.value,
        updatedGender: this.refs.gender.value,
        updatedImage: this.refs.profile_image.value,
        updatedAge: this.refs.age.value,
      }).catch((err) => { return err; });
        window.location.href = "https://memedrapp.herokuapp.com/";
    }
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          {this.checkUserStatus()}
        </div>
      </div>
    );
  }
}