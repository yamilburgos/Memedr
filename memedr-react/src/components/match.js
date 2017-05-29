import React, { Component } from 'react'; // eslint-disable-next-line
import '../App.css';

export default class Match extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.renderMatches = this.renderMatches.bind(this);
    }

    handleDelete(e) {
        let username = e.target.getAttribute('alt');
        let id = this.props.response.id;
        this.props.deleteMatch(username, id);
    }

    renderMatches() {
        if (this.props.username === undefined) {
            return (
                <div>
                    <center><h1>Sorry, no matches yet. Like a meme!</h1></center>
                </div>
            )
        } else {
            return (         
                <div>
                    <div id="matchesDiv">
                        <h1 id="matchUserName">{this.props.username}</h1> 
                        <h4 id="matchUserStats">{this.props.age} / {this.props.gender} / {this.props.location}</h4>
                        <p><img id="matchesId"src={this.props.profile_image} alt={this.props.username} className="profileImageMatches" onClick={this.handleDelete} /></p>
                        <h4 id="matchesEmail">{this.props.email}</h4>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderMatches()}
            </div>
        )
    }
}