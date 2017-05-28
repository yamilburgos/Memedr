import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import '../App.css';

export default class About extends Component {

  render() {
    return (
      <div className="bigBorder container"> 
          <div id="aboutMemedrDiv">
            <h3>About</h3> <br /> <span className="title">Memedr</span>
              <div id="aboutText">
                <p>Like a meme make a friend</p>
                <br />
                <p>Memedr matches you with other users who like the same memes as you do</p>
              </div>
          </div>
          <div id="homeButtonInAbout">
            <NavLink to="/"><button className="homeButton btn btn-info" type="submit">Home</button></NavLink>
          </div>
      </div>
    );
  }
}