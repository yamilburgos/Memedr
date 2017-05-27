import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';

export default class Meme extends Component {
    constructor(props) {
        super(props);

        this.state = { disabled: false }

        this.renderMemes = this.renderMemes.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

        this.handleLike = this.handleLike.bind(this);
        this.handleUnLike = this.handleUnLike.bind(this);

    }

    renderMemes() {
        return (
            <div>
                <p><img src={this.props.memeLink} alt={this.props.memeName} /></p>
                <p>{this.props.memeName}</p>
            </div>
        );
    }

    handleLike(){ this.setState({ disabled: true })}
    handleUnLike(){ this.setState({ disabled: false })}

    renderButtons(){
        if(!this.state.disabled){
            return (
                <p>
                    <button onClick={this.handleLike}>Like</button>
                </p>
            )
        } else {
            return (
                <p>
                    <button onClick={this.handleUnLike}>UnLike</button>
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