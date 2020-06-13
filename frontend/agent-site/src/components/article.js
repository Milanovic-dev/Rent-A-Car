import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';

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
                    <div className="divider"></div>
                    <div style={{textAlign: "center"}}>
                        <a href="/#" className="text-primary" style={{fontSize: 23 }}>Add to cart</a> 
                    </div>
                </div>
            </a>
        )
    }
}

export default Article;