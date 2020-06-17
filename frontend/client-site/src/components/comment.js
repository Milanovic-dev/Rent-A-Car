import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';

export class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="comment-box" key={this.props.id}>
                {/* <img src={this.props.image} /> */}
                <div className="content">
                    <div className="title">
                        <h6 className="title">{this.props.userId}</h6>
                        <h5 className="rate">RATE: {this.props.rate}</h5>
                        <h4 className="date">{this.props.date}</h4>
                    </div>

                    <div className="divider"></div>
                    <div className="text">
                        <h3>{this.props.comment}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;