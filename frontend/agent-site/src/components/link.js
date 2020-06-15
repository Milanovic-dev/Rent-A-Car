import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class LangLink extends Component{
    constructor(props){
        super(props);
    }

    render(){
    return (
        <Link to={this.props.to} className={this.props.className}>{this.props.children}</Link>
    )
  }
}
