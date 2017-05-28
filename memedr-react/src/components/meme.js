import React, { Component } from 'react'; // eslint-disable-next-line
import '../App.css';

export default class Meme extends Component {
    constructor(props) {
        super(props);

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
        this.props.toggleDisabled(this);
        let memeid = e.target.getAttribute('id'); 
        this.props.likeMeme(this.props.response.id, memeid); 
    }

    handleUnLike(e){  
        this.props.toggleDisabled(this);
        let memeid = e.target.getAttribute('id'); 
        this.props.unLikeMeme(this.props.response.id, memeid); 
    }

    renderButtons(){
        if(!this.props.disabled){
            return (
                <div className = "likeUnlikeDiv">
                    <button className="btn btn-info" id={this.props.memeID} onClick={this.handleLike}>Like</button>
                </div>
            )
        } else {
            return (
                <div className = "likeUnlikeDiv">
                    <button className="btn btn-danger" id={this.props.memeID} onClick={this.handleUnLike}>UnLike</button>
                </div>
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