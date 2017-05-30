import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import MemeList from './memelist';

export default class Main extends Component {

  constructor(props){
    super(props);

    this.likeMeme = this.likeMeme.bind(this);
    this.unLikeMeme = this.unLikeMeme.bind(this);
    this.props.setMemeList();
  }

  likeMeme(id, memeid) {
    document.querySelectorAll('.memeDiv').forEach((element, index) => {
      let x = element.getAttribute('id').split('_')[1];
// hide all the memes that are not the one selected 
      if (x !== memeid) {
        element.parentNode.setAttribute("class", "hideMemeDiv");
      }
    });

    this.props.changeView(memeid, false);

    // post to the like end point the user name and meme id the like together on the like table
    axios.post("https://memedr.herokuapp.com/users/profile/like/" + id, {
      id: id,
      memeid: memeid
    }).catch((err) => { return err });
  }

  // when unlike is clicked, it un hides the hidden memes
  unLikeMeme(id, memeid) {
    document.querySelectorAll('.memeDiv').forEach((element, index) => {
      element.parentNode.removeAttribute("class", "hideMemeDiv");
    });

    this.props.changeView(-1, true);
    this.props.clearMatches();

    // this makes a call to the unlike endpoint 
    axios.put("https://memedr.herokuapp.com/users/profile/unlike/" + id, {
      id: id,
      memeid: memeid
    }).catch((err) => { return err });
  }
// from the main page we can link to out profile and our matches we instanite the meme list component and pass it props
  render() {
    return (
      <div className="memeBorder bigBorder">
        <div className="tempBorder">
          <div className="navButtons">
            <NavLink to="/profile"><button className="btn btn-info" type="submit">My Profile</button></NavLink>&nbsp;
            <NavLink to="/matches"><button className="btn btn-info" type="submit">My Matches</button></NavLink>
          </div>
          <MemeList memes={this.props.memes}
            response={this.props.userData}
            likeMeme={this.likeMeme}
            unLikeMeme={this.unLikeMeme}
            disabled={this.props.disabled}
            toggleDisabled={this.props.toggleDisabled} 
            chosenMeme={this.props.chosenMeme}
            hideAll={this.props.hideAll}
          />
        </div>
      </div>
    );
  }
}