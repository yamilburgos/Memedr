import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MemeList from './memelist';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: [],
      response: this.props.response,
    }
  }

  checkUserStatus() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((response) => {
        this.setState({
          memes: response.data.memes
        });
      })
      .catch((err) => { return err });
  }

  likeMeme(id, memeid) {
    axios.post("https://memedr.herokuapp.com/users/profile/like/" + id, {
      id: id, memeid: memeid
    }).catch((err) => { return err });
  }

  unLikeMeme(id, memeid) {
    axios.put("https://memedr.herokuapp.com/users/profile/unlike/" + id, {
      id: id, memeid: memeid
    }).catch((err) => { return err });
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          {this.checkUserStatus()}
          <br />
          <button>Matches</button>
          <button>Saves</button>
          <button>Main</button>

          <MemeList memes={this.state.memes} response={this.state.response} likeMeme={this.likeMeme} unLikeMeme={this.unLikeMeme} />
        </div>
      </div>
    );
  }
}