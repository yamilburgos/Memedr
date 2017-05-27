import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MatchesList from './matcheslist';

export default class Matches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [{}],
      disabled: this.props.disabled, 
      liked: this.props.liked
    }
  }

  componentWillMount() {
    let id = this.props.userID;

    axios.get("https://memedr.herokuapp.com/users/profile/matches/" + id, {
      id: id
    }).then((res) => {

      this.setState({ matches: res.data.data });
      //console.log(this.state.matches);

    }).catch((err) => { return err });
  }

  deleteMatch(){
    console.log("delete clicked");
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

          <MatchesList matches={this.state.matches} deleteMatch={this.deleteMatch} />
        </div>
      </div>
    );
  }
}