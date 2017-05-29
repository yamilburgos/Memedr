import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';
import '../App.css';

import Match from './match';
// this is where the real work of making the matches happpend. the matchs data gets mapped to the match component the match component is created for each matched user
export default class MatchesList extends Component {
    render() {
        return (
            <div>
                {this.props.matches.map((element, index) => {
                    return (
                        <Match key={index}
                            username={element.username}
                            gender={element.gender}
                            location={element.location}
                            profile_image={element.profile_image}
                            email={element.email}
                            age={element.age}
                            deleteMatch={this.props.deleteMatch} 
                            dataSlideTo={index}
                            response={this.props.response}
                        />
                    )
                })}
            </div>
        )
    }
}