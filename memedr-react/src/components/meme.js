import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';
import '../App.css';

export default class Meme extends Component {
    constructor(props) {
        super(props);

        this.state = { disabled: false, liked: false };

        this.renderMemes = this.renderMemes.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

        this.handleLike = this.handleLike.bind(this);
        this.handleUnLike = this.handleUnLike.bind(this);

    }

    renderMemes() {
        return (
            <div className="memeDiv">
                <p><img src={this.props.memeLink} className="memeImage" alt={this.props.memeName} id={this.props.memeID} /></p>
                <p className="memeName">{this.props.memeName}</p>
            </div>
        );
    }

    handleLike(e){ 
        this.setState({ disabled: true, liked: true }); 
        let memeid = e.target.getAttribute('id'); 
        this.props.likeMeme(this.props.response.id, memeid); 
    }

    handleUnLike(e){ 
        this.setState({ disabled: false, liked: false }); 
        let memeid = e.target.getAttribute('id'); 
        this.props.unLikeMeme(this.props.response.id, memeid); 
    }

    renderButtons(){
        if(!this.state.disabled){
            return (
                <p>
                    <button id={this.props.memeID} onClick={this.handleLike}>Like</button>
                </p>
            )
        } else {
            return (
                <p>
                    <button id={this.props.memeID} onClick={this.handleUnLike}>UnLike</button>
                </p>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderMemes()}
                {this.renderButtons()}
            </div>
        );
    }
}