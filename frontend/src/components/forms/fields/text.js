
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder}/>
                <label>{this.props.label}</label>
            </div>
        );
    }
}

export default Text;