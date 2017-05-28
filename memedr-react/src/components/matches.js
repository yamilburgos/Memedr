import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MatchesList from './matcheslist';
let _isMounted = false;

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

  componentDidMount() {
    let id = this.props.userID;
    if (_isMounted) {
      return;
    }
    axios.get("https://memedr.herokuapp.com/users/profile/matches/" + id, {id})
         .then((res) => {
            let matches = res.data.data;
            this.setState({ matches }); })
        .catch((err) => { return err });
    /*axios.interceptors.response.use("https://memedr.herokuapp.com/users/profile/matches/" + id, {
      id: id
    }, (response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
      return Promise.reject(error);
    })*/
  }

  componentWillUnmount() {
    _isMounted = false;
  }

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
          <NavLink to="/profile"><button className="btn btn-default" type="submit">Profile</button></NavLink>
          <NavLink to="/main"><button className="btn btn-default" type="submit">Main</button></NavLink>
          <NavLink to="/matches"><button className="btn btn-default" type="submit">Matches</button></NavLink>
          <MatchesList matches={this.state.matches}
            deleteMatch={this.deleteMatch} />
        </div>
      </div>
    );
  }
}