import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink } from 'react-router-dom';

export default class About extends Component {

  render() {
    return (
      <div className="bigBorder container">

          <NavLink to="/"><button className="btn btn-default homeButtonInAbout" type="submit">home</button></NavLink>

          <h3>About</h3>
          <ul>
            <li>Like a Meme make a friend.</li>
            <li>Memedr brings people together based on their choice of memes.</li>
          </ul>
      </div>
    );
  }
}