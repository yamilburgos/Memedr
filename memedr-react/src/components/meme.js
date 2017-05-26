import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';

import MemeList from './memelist';

export default class Meme extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
    }

    renderMemes(){
        this.props.memes.map((element, index) => {
            return (
                <Meme key={index} memeName={element.meme_name} memeLink={element.meme_link} />
            )
        });
    }

    render(){
       //console.log(this.props);
        return (
            <div>
                {this.memeName}
            </div>
        );
    }
}