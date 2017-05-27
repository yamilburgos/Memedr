import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';
import '../App.css';

import Match from './match';

export default class MatchesList extends Component {
    render() {
        return (
            <div>
                {this.props.matches.map((element, index) => {
                    //console.log(element);
                    return (
                        <Match key={index}
                        username={element.username} 
                        gender={element.gender}
                        location={element.location}
                        profile_image={element.profile_image}
                        email={element.email}
                        age={element.age} />
                    )
                })}
            </div>
        )
    }
}