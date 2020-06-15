
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
           
            <textarea className={this.props.error ? "form-field required" : "form-field"}  onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder}></textarea>


        );
    }
}

export default Textarea;