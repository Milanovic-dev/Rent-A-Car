import React, { Component } from 'react';

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <textarea onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder}></textarea>
                <label>{this.props.label}</label>
            </div>
        );
    }
}

export default Textarea;