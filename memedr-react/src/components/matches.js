import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import '../App.css';

import MatchesList from './matcheslist';

export default class Matches extends Component {
  constructor(props) {
    super(props);

    this.deleteMatch = this.deleteMatch.bind(this);
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return this.props.setMatchesList();
  }

  deleteMatch(username) {
    console.log(username);
    console.log("delete my match");
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
                       toggleDisabled={this.props.toggleDisabled} />
        </div>
      </div>
    );
  }
}