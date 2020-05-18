import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Isvg from 'react-inlinesvg';


import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';



function generateAlias(str) {
    /*str = str.toLowerCase();
    str = str.replace(/\s\s+/g, ' ');
    str = str.replace(/ /g, '-');
    str = str.replace(/\./g, '-');
    str = str.replace(/\,/g, '-');
    str = str.replace(/š/g, 's');
    str = str.replace(/č/g, 'c');
    str = str.replace(/ć/g, 'c');
    str = str.replace(/đ/g, 'dj');
    str = str.replace(/ž/g, 'z');*/
    str = str.replace(/[^a-zA-Z0-9]/gi, '-').toLowerCase()
    return str;
}

export class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        return (
            <a href={`/cars/${this.props.id}`} className="article-box" key={this.props.id}>
                <img src={this.props.image} />
                <div className="content">
                    <h6 className="title">{this.props.title}</h6>
                    <ul className="attrs">
                        <li><Isvg src={fuel_icon} /> {this.props.fuel}</li>
                        <li><Isvg src={calendar_icon} /> {this.props.year}</li>
                        <li><Isvg src={guage_icon} /> {this.props.mileage}</li>
                    </ul>

                    <div className="divider"></div>
                    <div className="price-container">
                        <span className="price">{this.props.price}</span>
                    </div>
                </div>
            </a>
        )
    }
}

export default Article;