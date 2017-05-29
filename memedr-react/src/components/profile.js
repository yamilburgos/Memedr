import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default class Profile extends Component {
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

  renderGender(){
    if ( this.props.userData.gender  === "Male") {
      return (
      <select ref="gender">
        <option defaultValue value="Male">{this.props.userData.gender}</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      )
    } else if ( this.props.userData.gender  === "Female") {
      return (
      <select ref="gender">
        <option defaultValue value="Female">{this.props.userData.gender}</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
      </select>
      )
    } else {
      return (
      <select ref="gender">
        <option defaultValue value="Other">{this.props.userData.gender}</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      )
    }
  }

  renderLocations(){
    if ( this.props.userData.location  === "Queens") {
      return (
        <select ref="location">
          <option defaultValue value="Queens">{this.props.userData.location}</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Staten Island">Staten Island</option>
          <option value="Brookyln">Brooklyn</option>
          <option value="Bronx">Bronx</option>
        </select>
      )
    } else if ( this.props.userData.location  === "Manhattan") {
      return (
      <select ref="location">
          <option value="Queens">Queens</option>
          <option defaultValue value="Manhattan">{this.props.userData.location}</option>
          <option value="Staten Island">Staten Island</option>
          <option value="Brookyln">Brooklyn</option>
          <option value="Bronx">Bronx</option>
        </select>
      )
    } else if ( this.props.userData.location  === "Staten Island") {
      return (
      <select ref="location">
          <option value="Queens">Queens</option>
          <option value="Manhattan">Manhattan</option>
          <option defaultValue value="Staten Island">{this.props.userData.location}</option>
          <option value="Brookyln">Brooklyn</option>
          <option value="Bronx">Bronx</option>
        </select>
      )
    } else if ( this.props.userData.location  === "Brooklyn") {
      return (
      <select ref="location">
          <option value="Queens">Queens</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Staten Island">Staten Island</option>
          <option defaultValue value="Brookyln">{this.props.userData.location}</option>
          <option value="Bronx">Bronx</option>
        </select>
      )
    } else {
      return (
      <select ref="location">
          <option value="Queens">Queens</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Staten Island">Staten Island</option>
          <option value="Brookyln">Brooklyn</option>
          <option defaultValue value="Bronx">{this.props.userData.location}</option>
        </select>
      )
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
            <div id="profileImageDiv">
                <img src={this.props.userData.profile_image} className="profileImage" alt={this.props.userData.username}></img>
            </div>
            <div id="profileInfoDiv">
                <p>profile image link <input type="url" ref="profile_image" defaultValue={this.props.userData.profile_image} /> </p> 
                <p>username <input type="text" ref="username" defaultValue={this.props.userData.username} /></p>
                <p>email <input type="email" ref="email" defaultValue={this.props.userData.email} /></p>
                <p>location {this.renderLocations()}</p>
                <p>gender {this.renderGender()}</p>
                <p>age <input type="number" ref="age" defaultValue={this.props.userData.age} min="18" max="100" /></p>
                <br />
                <br />
              <div id="updateDeleteButtons" className="updateDeleteDiv">
                <button className="btn btn-primary"onClick={this.handleUpdateAccount.bind(this)}> update account </button>
                <button className="btn btn-danger" onClick={this.handleDeleteAccount.bind(this)}> delete account </button>
              </div>
            </div>
         </div>
      </div>
    );
  }
}