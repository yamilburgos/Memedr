import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// IMPORT COMPONENTS
import UserStatus from "./components/userStatus";
import Landing from './components/landing';
import About from "./components/about";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Main from "./components/main";
import Matches from "./components/matches";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loggedIn: false,
      response: [],
      memes: [],
      logMessage: ""
    };
  }

  userStatusComponent = () => {
    return (
      <UserStatus
        loggedIn={this.state.loggedIn}
        signUp={<NavLink to="/signup">Sign Up</NavLink>}
        logout={this.logoutUserName.bind(this)}
      />
    );
  }

  landingComponent = () => {
    return (
      <Landing
        loggedIn={this.state.loggedIn}
        errorMessage={(this.state.logMessage !== undefined) ? this.state.logMessage : ""}
        logUserName={this.loggingUserName.bind(this)} 
      />
    );
  }

  signupComponent = () => {
    return (
      <SignUp
        loggedIn={this.state.loggedIn}
        errorMessage={(this.state.logMessage !== undefined) ? this.state.logMessage : ""}
        setUserName={this.settingUserName.bind(this)} 
      />
    );
  }

  mainComponent = () => {
    return (
      <Main
        loggedIn={this.state.loggedIn}
        userData={(this.state.response !== undefined) ? this.state.response : []}
        memes={this.state.memes}
        setMemeList={this.mainMemeList.bind(this)}
      />
    );
  }

  profileComponent = () => {
    return (
      <Profile
        loggedIn={this.state.loggedIn}
        userData={(this.state.response !== undefined) ? this.state.response : []}
      />
    );
  }

  matchesComponent = () => {
    return (
      <Matches
        loggedIn={this.state.loggedIn}
        userID={(this.state.response !== undefined) ? this.state.response.id : 1} 
      />
    );
  }

  logoutUserName() {
    axios.get("https://memedr.herokuapp.com/auth/logout")
      .then((response) => {
        this.setState({
          response: [],
          loggedIn: response.data.loggedIn,
          logMessage: ""
        });
      }).catch(function (error) {
        console.log(error);
      });
  }

  loggingUserName(submittedName, submittedPassword) {
    this.setState({ logMessage: "" })

    axios.post("https://memedr.herokuapp.com/auth/login", {
      username: submittedName,
      password: submittedPassword
    }).then((response) => {
      this.setState({
        response: response.data.user_profile,
        loggedIn: response.data.loggedIn,
        logMessage: response.data.status
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  settingUserName(signupDataArray) {
    this.setState({ logMessage: "" })

    axios.post("https://memedr.herokuapp.com/auth/register", {
      username: signupDataArray[0],
      password: signupDataArray[1],
      email: signupDataArray[2],
      location: signupDataArray[3],
      gender: signupDataArray[4],
      profile_image: signupDataArray[5],
      age: signupDataArray[6]
    }).then((response) => {
      this.setState({
        response: response.data.user_profile,
        loggedIn: response.data.loggedIn,
        logMessage: response.data.message
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  mainMemeList() {
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((response) => {
        this.setState({
          memes: response.data.memes
        });
      }).catch(function(error) { 
        console.log(error); 
      });
  }

  render() {
    return (
      <div className="App-header">
        <Router>
          <div id="wrapper">
            <Route render={() => this.userStatusComponent()}></Route>
		       <Switch>
              <Route path="/" exact render={() => this.landingComponent()}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/signup" render={() => this.signupComponent()}></Route>
              <Route path="/profile" render={() => this.profileComponent()}></Route>
              <Route path="/main" render={() => this.mainComponent()}></Route>
              <Route path="/matches" component={() => this.matchesComponent()}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}