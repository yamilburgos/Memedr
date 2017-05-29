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
      matches: [{}],
      logMessage: "",
      disabled: false
    };

    this.toggleDisabled = this.toggleDisabled.bind(this);
    this.getMyMatches = this.getMyMatches.bind(this);
  }

  userStatusComponent = () => {
    return (
      <UserStatus
        loggedIn={this.state.loggedIn}
        disabled={this.state.disabled}
        signUp={<NavLink to="/signup">Sign Up</NavLink>}
        logout={this.logoutUserName.bind(this)}
      />
    );
  }

  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled
    });
  }

  toggleErrorMessage() {
    this.setState({
      logMessage: ""
    });
  }

  landingComponent = () => {
    return (
      <Landing
        loggedIn={this.state.loggedIn}
        disabled={this.state.disabled}
        errorMessage={(this.state.logMessage !== undefined) ? this.state.logMessage : ""}
        logUserName={this.loggingUserName.bind(this)}
        clearError={this.toggleErrorMessage.bind(this)}
      />
    );
  }

  signupComponent = () => {
    return (
      <SignUp
        loggedIn={this.state.loggedIn}
        disabled={this.state.disabled}
        errorMessage={(this.state.logMessage !== undefined) ? this.state.logMessage : ""}
        setUserName={this.settingUserName.bind(this)}
        clearError={this.toggleErrorMessage.bind(this)}
      />
    );
  }

  mainComponent = () => {
    return (
      <Main
        loggedIn={this.state.loggedIn}
        disabled={this.state.disabled}
        userData={(this.state.response !== undefined) ? this.state.response : []}
        memes={this.state.memes}
        response={this.state.response}
        setMemeList={this.mainMemeList.bind(this)}
        toggleDisabled={this.toggleDisabled.bind(this)}
      />
    );
  }

  profileComponent = () => {
    return (
      <Profile
        loggedIn={this.state.loggedIn}
        response={this.state.response}
        disabled={this.state.disabled}
        toggleDisabled={this.toggleDisabled}
        userID={(this.state.response !== undefined) ? this.state.response.id : 1}
        userData={(this.state.response !== undefined) ? this.state.response : []}
      />
    );
  }

  matchesComponent = () => {
    return (
      <Matches
        loggedIn={this.state.loggedIn}
        disabled={this.state.disabled}
        userData={(this.state.response !== undefined) ? this.state.response : []}
        userID={(this.state.response !== undefined) ? this.state.response.id : 1}
        setMatchesList={this.getMyMatches.bind(this)}
        matches={this.state.matches}
        toggleDisabled={this.toggleDisabled.bind(this)}
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
      //window.location.href = "https://memedrapp.herokuapp.com/";
  }

  loggingUserName(submittedName, submittedPassword) {
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
      }).catch((error) => {
        console.log(error);
      });
  }

  getMyMatches() {
    //let id = this.props.userID;
    let id = this.state.response.id;

    axios.get("https://memedr.herokuapp.com/users/profile/matches/" + id, {id})
      .then((res) => {
        //let matches = res.data.data;
        this.setState({ 
          matches: res.data.data 
        }); 
      }).catch((err) => { 
        console.log(err); 
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
              <Route path="/matches" render={() => this.matchesComponent()}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}