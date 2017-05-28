import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';
import '../App.css';

export default class Match extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.renderMatches = this.renderMatches.bind(this);
    }

    handleDelete(e) {
        let username = e.target.getAttribute('alt');
        console.log(username);
        this.props.deleteMatch(username);
    }

    renderMatches() {
        if (this.props.username === undefined) {
            return (
                <div>
                    <h1>Sorry, no matches</h1>
                </div>
            )
        } else {
            return (         
                <div>
                    <h1>{this.props.username} <small>{this.props.age}, {this.props.gender}, {this.props.location}</small></h1>
                    <p><img src={this.props.profile_image} alt={this.props.username} className="profileImageMatches" onClick={this.handleDelete} /></p>
                </div>
            )
        }
    }

    render() {
        return (
            <div> {this.renderMatches()}</div>
        )
    }
}