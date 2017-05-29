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

  deleteMatch(username, id) {
    console.log(username);
    console.log(id);
    console.log("delete my match");

    axios.put("https://memedr.herokuapp.com/users/profile/delete/match/" + id, {
      id: id,
      username: username
    }).catch((err) => { return err });
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          <div className="navButtons">
            <NavLink to="/profile"><button className="btn btn-info" type="submit">My Profile</button></NavLink>&nbsp;&nbsp;
            <NavLink to="/main"><button className="btn btn-info" type="submit">Pick Memes</button></NavLink>
          </div>
          <MatchesList matches={this.props.matches}
            deleteMatch={this.deleteMatch}
            disabled={this.props.disabled}
            response={this.props.response}
            toggleDisabled={this.props.toggleDisabled} />
        </div>
      </div>
    );
  }
}