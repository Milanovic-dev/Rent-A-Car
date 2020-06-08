import React, { Component } from 'react';

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