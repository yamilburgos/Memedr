import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MemeList from './memelist';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: [],
    }
  }

  checkUserStatus() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
        
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((res) => {
        this.setState({
          memes: res.data.memes
        });
      })
      .catch((err) => { return err });
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
          {this.checkUserStatus()}
          <NavLink to="/profile"><button className="btn btn-default" type="submit">Profile</button></NavLink>
          <NavLink to="/matches"><button className="btn btn-default" type="submit">Matches</button></NavLink>
          <MemeList memes={this.state.memes} response={this.props.response} likeMeme={this.likeMeme} unLikeMeme={this.unLikeMeme} />
        </div>
      </div>
    );
  }
}