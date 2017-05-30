import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MatchesList from './matcheslist';

export default class Matches extends Component {
  constructor(props) {
    super(props);

    this.deleteMatch = this.deleteMatch.bind(this);
    this.props.setMatchesList();
  }
  
// when a match is made tis call would allow the user to delete a particular match from thir match list
  deleteMatch(username, id) {
    console.log(username);
    console.log(id);
    console.log("delete my match");

    axios.put("https://memedr.herokuapp.com/users/profile/delete/match/" + id, {
      id: id,
      username: username
    }).catch((err) => { return err });
  }  

// this route is doesnt render the matches itself but is the parent of match list to which we pass props to// remember this: Matches renders Matchlist which renders Match
  render() {
    if (this.props.chosenMeme !== -1 && this.props.matches.length > 0) {
      return (
        <div className="matchesBorder bigBorder">
          <div className="tempBorder">
            <div className="navButtons">
              <NavLink to="/profile"><button className="btn btn-info" type="submit">My Profile</button></NavLink>&nbsp;&nbsp;
              <NavLink to="/main"><button className="btn btn-info" type="submit">Pick Memes</button></NavLink>
            </div>
            <MatchesList matches={this.props.matches}
              deleteMatch={this.deleteMatch}
              disabled={this.props.disabled}
              response={this.props.userData}
              toggleDisabled={this.props.toggleDisabled} />
          </div>
        </div>
      );
    }

    else {
      return (
        <div className="matchesBorder bigBorder">
          <div className="tempBorder">
            <div className="navButtons">
              <NavLink to="/profile"><button className="btn btn-info" type="submit">My Profile</button></NavLink>&nbsp;&nbsp;
              <NavLink to="/main"><button className="btn btn-info" type="submit">Pick Memes</button></NavLink>
            </div>
              <center><h1>Sorry, no matches yet. Like a meme!</h1></center>
          </div>
        </div>
      );
    }
  }
}