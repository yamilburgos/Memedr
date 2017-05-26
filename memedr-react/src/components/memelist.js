import React, { Component } from 'react'; // eslint-disable-next-line
import axios from 'axios';

export default class MemeList extends Component {
    constructor(props){
        super(props);
    }

    renderMemes(){
        console.log(this.props)
        return (
            <p>
                {this.props.memeName}
            </p>
        )
    }

    render(){
        return (
            <div>
                {this.renderMemes()}
            </div>
        );
    }
}