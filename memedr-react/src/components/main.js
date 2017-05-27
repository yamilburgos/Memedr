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
      response: this.props.response,
      disabled: this.props.disabled,
    }
  }

  getAllMemes(){
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return this.props.setMemeList();
  }

  likeMeme(id, memeid) {

    document.querySelectorAll('.memeDiv').forEach((element, index) => {
      let x = element.getAttribute('id').split('_')[1];

      if (x !== memeid) {
        element.parentNode.setAttribute("class", "hideMemeDiv");
      }
    });

    axios.post("https://memedr.herokuapp.com/users/profile/like/" + id, {
      id: id,
      memeid: memeid
    })
      .catch((err) => { return err });
  }

  unLikeMeme(id, memeid) {

    document.querySelectorAll('.memeDiv').forEach((element, index) => {
      element.parentNode.removeAttribute("class", "hideMemeDiv");
    });

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
          <br />
          <button>Matches</button>
          <button>Saves</button>
          <button>Main</button>

          {this.getAllMemes()}
          <NavLink to="/profile"><button className="btn btn-default" type="submit">Profile</button></NavLink>
          <NavLink to="/matches"><button className="btn btn-default" type="submit">Matches</button></NavLink>
          <MemeList memes={this.state.memes}
            response={this.state.response}
            likeMeme={this.likeMeme}
            unLikeMeme={this.unLikeMeme}
            disabled={this.props.disabled}
            toggleDisabled={this.props.toggleDisabled}
          />
        </div>
      </div>
    );
  }
}