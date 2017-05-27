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

  componentWillMount() {
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((res) => {

        this.setState({ memes: res.data.memes })

      }).catch((err) => { return err })
  }

  likeMeme(id, memeid) {
    axios.post("https://memedr.herokuapp.com/users/profile/like/" + id, {
      id: id,
      memeid: memeid
    });
  }

  unLikeMeme(id) {
    axios.delete("https://memedr.herokuapp.com/users/profile/remove/like/" + id, {
      id: id
    });
  }

  checkUserStatus() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
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