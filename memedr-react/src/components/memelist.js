import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';
import '../App.css';

import Meme from './meme';

export default class MemeList extends Component {
        callMe() {
            this.array = this.props.memes.filter((data) => {
                return data.id === this.props.chosenMeme || this.props.hideAll;
            });

            if(this.props.hideAll) {
                return (
                    <div>
                        {this.array.map((element, index) => {
                            return (
                                <Meme key={index}
                                    memeLink={element.meme_link}
                                    memeName={element.meme_name}
                                    memeID={element.id}
                                    likeMeme={this.props.likeMeme}
                                    unLikeMeme={this.props.unLikeMeme}
                                    response={this.props.response}
                                    disabled={this.props.disabled}
                                    toggleDisabled={this.props.toggleDisabled}
                                    dataSlideTo={index}
                                />
                            )
                        })}
                    </div>
                )
            }
            else {
                return (
                    <Meme 
                        key={0}
                        memeLink={this.array[0].meme_link}
                        memeName={this.array[0].meme_name}
                        memeID={this.array[0].id}
                        likeMeme={this.props.likeMeme}
                        unLikeMeme={this.props.unLikeMeme}
                        response={this.props.response}
                        disabled={this.props.disabled}
                        toggleDisabled={this.props.toggleDisabled}
                        dataSlideTo={0}
                    />
                )
            }
    }

    render() {
        return (
            <div>{this.callMe()}</div>
        )
    }
}