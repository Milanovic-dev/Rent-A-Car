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

    addToCart(id){
        fetch(`https://localhost:8080/orders/cart/add/${id}`, {
            method: 'POST',
        }).then(res => {
            if(res.status == '201'){
                console.log("Added");
            }
        });
    }

    render() {
        return (
            <div className="article-box" key={this.props.id}>
                <img src={this.props.image} />
                <div className="content">
                    <h6 className="title"><a href={`/cars/${this.props.id}`} style={{color:'black'}}>{this.props.title}</a></h6>
                    <ul className="attrs">
                        <li><Isvg src={fuel_icon} /> {this.props.fuel}</li>
                        <li><Isvg src={calendar_icon} /> {this.props.year}</li>
                        <li><Isvg src={guage_icon} /> {this.props.mileage}</li>
                    </ul>
                    <div className="divider"></div>
                    <div className="price-container">
                        <span className="price">{this.props.price}€</span>
                    </div>
                    <div className="addToCart-button" onClick={()=> {this.addToCart(this.props.id)}}>
                        <span style={{fontSize: 23}}>Add to cart</span> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Article;