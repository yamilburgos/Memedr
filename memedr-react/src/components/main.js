import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MemeList from './memelist';

export default class Main extends Component {
  getAllMemes() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return this.props.setMemeList();
  }

  likeMeme(id, memeid) {
    axios.post("https://memedr.herokuapp.com/users/profile/like/" + id, {
      id: id,
      memeid: memeid
    })
    .catch((err) => { return err });
  }

  unLikeMeme(id, memeid) {
    axios.put("https://memedr.herokuapp.com/users/profile/unlike/" + id, {
      id: id,
      memeid: memeid
    })
    .catch((err) => { return err });
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          {this.getAllMemes()}
          <NavLink to="/profile"><button className="btn btn-default" type="submit">Profile</button></NavLink>
          <NavLink to="/matches"><button className="btn btn-default" type="submit">Matches</button></NavLink>
          <MemeList memes={this.props.memes} response={this.props.userData} likeMeme={this.likeMeme} unLikeMeme={this.unLikeMeme} />
        </div>
      </div>
    );
  }
}