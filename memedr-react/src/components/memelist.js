import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';

import Meme from './meme';

export default class MemeList extends Component {
    render() {
        return (
            <div>
                {this.props.memes.map((element, index) => {
                    return (
                        <Meme key={index} memeLink={element.meme_link} memeName={element.meme_name} 
                        likeMeme={this.props.likeMeme}
                        unLikeMeme={this.props.unLikeMeme}
                        response={this.props.response} />
                    )
                })}
            </div>
        )
    }
}