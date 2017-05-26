import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink } from 'react-router-dom';

export default class About extends Component {

  render() {
    return (
      <div className="bigBorder">

          <NavLink to="/"><button className="btn btn-default" type="submit">home</button></NavLink>


          <h3>About</h3>
         <p>
           Like a Meme make a friend.
           <br/>
           Memedr brings people together based on their choice of memes. 
    
         </p>
      </div>
    );
  }
}