import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default class Profile extends Component {
  checkUserStatus() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
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
    var x = window.confirm("Are you sure you want to update your account? You'll need to re login.");
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
       <div className=" profileContainerFirstDiv bigBorder">
        <div className="navButtons">
          <NavLink to="/main"><button className="btn btn-info" type="submit">Pick Memes</button></NavLink>&nbsp;&nbsp;
          <NavLink to="/matches"><button className="btn btn-info" type="submit">My Matches</button></NavLink>
        </div>
        <div className="profileContainerSecondDiv profileContainer container">
          {this.checkUserStatus()}
            <div id="profileImageDiv">
                <img src={this.props.userData.profile_image} className="profileImage" alt={this.props.userData.username}></img>
            </div>
            <div id="profileInfoDiv">
                <p>profile image link <input type="url" ref="profile_image" defaultValue={this.props.userData.profile_image} /> </p> 
                <p>username <input type="text" ref="username" defaultValue={this.props.userData.username} /></p>
                <p>email <input type="email" ref="email" defaultValue={this.props.userData.email} /></p>
                <p>location <input type="text" ref="location" defaultValue={this.props.userData.location} /></p>
                <p>gender <input type="text" ref="gender" defaultValue={this.props.userData.gender} /></p>
                <p>age <input type="number" ref="age" defaultValue={this.props.userData.age} min="18" max="100" /></p>
                <br />
                <br />
              <div id="updateDeleteButtons">
                <button className="btn btn-primary"onClick={this.handleUpdateAccount.bind(this)}> update account </button>
                <button className="btn btn-danger" onClick={this.handleDeleteAccount.bind(this)}> delete account </button>
              </div>
            </div>
         </div>
      </div>
    );
  }
}