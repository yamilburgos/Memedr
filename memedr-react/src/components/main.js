import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

export default class Main extends Component {
  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <br/>
            <button>Matches</button>
            <button>Saves</button>
            <button>Main</button>

            <div className="imgBorder"></div>
            <br/>
            <p>X</p>
            <p>O</p>
          </div>
      </div>
    );
  }
}