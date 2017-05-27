import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';
import '../App.css';

export default class Match extends Component {
    constructor(props) {
        super(props);

        this.state = { noLongerLike: false };
    }

    renderMatches() {
        return (
            <div>
                <h1>{this.props.username} <small>{this.props.age}, {this.props.gender}, {this.props.location}</small></h1>
                <p><img src={this.props.profile_image} alt={this.props.username} className="profileImage" /></p>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.renderMatches()}
            </div>
        )
    }
}