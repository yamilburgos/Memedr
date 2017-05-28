import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MatchesList from './matcheslist';
/*let _isMounted = false;*/

export default class Matches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [{}],
      disabled: this.props.disabled,
    }
  }

  checkUserStatus() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
  }

  componentWillMount() {
    /*if (!_isMounted) {
      return
    }*/

    let url = "https://memedr.herokuapp.com/users/profile/matches/";
    let id = this.props.userID;

    axios.get(url + id, {id})
      .then((res) => {
        let matches = res.data.data;
        this.setState({ matches:matches }); })
      .catch((err) => { return err });
  }

  /*componentWillUnmount() {
    _isMounted = false;
  }*/

  deleteMatch(username) {
    console.log(username);
    console.log("delete clicked");
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          {this.checkUserStatus()}
          <br />
          <NavLink to="/profile"><button className="btn btn-info" type="submit">Profile</button></NavLink>
          <NavLink to="/main"><button className="btn btn-info" type="submit">Main</button></NavLink>
          <MatchesList matches={this.state.matches}
            deleteMatch={this.deleteMatch} />
        </div>
      </div>
    );
  }
}