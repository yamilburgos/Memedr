import React, { Component } from 'react';

export default class Matches extends Component {
  render() {
    return (
      <div className="bigBorder">
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