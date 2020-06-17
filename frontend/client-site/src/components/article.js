import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';

export class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addedToCart: false
        };
    }

    addToCart(id){

        if(!localStorage.getItem('token')){
            this.props.history.push('/signin')
            return;
        }

        if(this.state.addedToCart){
            return;
        }
        
        this.state.addedToCart = true;
        fetch(`https://localhost:8080/orders/cart/add/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if(res.status == '201'){
                this.state.addedToCart = true;
                this.forceUpdate();
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
                    <div className={this.state.addedToCart ? "addToCart-button-added" : "addToCart-button"} onClick={()=> {this.addToCart(this.props.id)}}>
                        <span style={{fontSize: 23}}>{this.state.addedToCart ? 'Added' : 'Add to cart'}</span> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Article;