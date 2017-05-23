import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

export default class Matches extends Component {
  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <br/>
            <h2>Matches</h2>

            <br/>
            <div className="imgBorder"></div>
            <p>Username: </p>
            <p>Email: </p>
            <button>Message User</button>
            <button>Unmatch User</button>

            <br/>
            <div className="imgBorder"></div>
            <p>Username: </p>
            <p>Email: </p>
            <button>Message User</button>
            <button>Unmatch User</button>

            <br/>
            <p>Report User</p>
          </div>
      </div>
    );
  }
}