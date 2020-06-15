
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';



class Option extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }






    render() {
        //console.log(this.props)
        //console.log(generateAlias("ćčććasd"))
        return (
                <div className="options">
                    <label>{this.props.label}</label>
                    <button type="button" onClick={() => this.props.onChange(true)}>
                        <div className={this.props.value === true ? 'active' : null}></div> <span>Ja </span>
                    </button>
                    <button type="button" onClick={() => this.props.onChange(false)}>
                        <div className={this.props.value === false ? 'active' : null}></div> <span>Nein </span>
                    </button>

                </div>

        );
    }
}

export default Option;