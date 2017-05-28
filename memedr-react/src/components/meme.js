import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';
import '../App.css';

export default class Meme extends Component {
    constructor(props) {
        super(props);


        //this.state = { disabled: this.props.disabled };


        this.renderMemes = this.renderMemes.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

        this.handleLike = this.handleLike.bind(this);
        this.handleUnLike = this.handleUnLike.bind(this);
    }

    renderMemes() {
        return (
            <div className="memeDiv" id={"memeid_"+this.props.memeID}>
                <p><img src={this.props.memeLink} className="memeImage" alt={this.props.memeName} id={this.props.memeID} /></p>
                <p className="memeName">{this.props.memeName}</p>
            </div>
        );
    }

    handleLike(e){ 

        //this.setState({ disabled: true }); 
        this.props.toggleDisabled(this);
        let memeid = e.target.getAttribute('id'); 
        this.props.likeMeme(this.props.response.id, memeid); 
    }

    handleUnLike(e){ 
        //this.setState({ disabled: false }); 
        this.props.toggleDisabled(this);
        let memeid = e.target.getAttribute('id'); 
        this.props.unLikeMeme(this.props.response.id, memeid); 
    }

    renderButtons(){
        if(!this.props.disabled){
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