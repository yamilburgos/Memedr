import React, { Component } from 'react';
import axios from 'axios'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.userData;
    // console.log("user id~~~~~" + this.props.userData.id);
  }

  handleDeleteAccount(){
    var x=window.confirm("Are you sure you want to delete your account?")
    if (x){
        window.alert("Account Deleted")
          let id = this.props.userData.id;
          axios.delete("https://memedr.herokuapp.com/users/profile/delete/" + id )
          .catch((err)=>{
            return err
          })
        console.log('account delete')
        window.location.href = "http://localhost:3000/"
      }
   
   
    
  
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
            <img src={this.props.userData.profile_image} className="profileImage" alt="profileImage.jpg"></img>
            <p>User Name: {this.props.userData.username}</p>
            <p>Email: {this.props.userData.email}</p>
            <p>Location: {this.props.userData.location}</p>
            <p>Gender: {this.props.userData.gender}</p>
            
            <br/><button>Edit Profile</button>
            {/*<br/><button>Change Password</button>*/}
            
            <br/>
            <br/>
            <button onClick={this.handleDeleteAccount.bind(this)}> delete account </button>
          </div>
      </div>
    );
  }
}