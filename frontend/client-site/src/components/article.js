import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';
import cartIcon from '../assets/svg/shopping-cart.svg';
import { NavLink } from 'react-router-dom';

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
            }else if(res.status == '422'){
                console.log('Already added');
            }
        });
    }

    render() {
        let pricePerDay = this.props.pricelist ? this.props.pricelist.pricePerDay : 0;
        let sale = this.props.pricelist ? this.props.pricelist.sale : 0
        const realPrice = pricePerDay - ((pricePerDay / 10) * (sale/10));
        return (
            <div className="article-box" key={this.props.id}>
                <img src={this.props.images ? this.props.images[0] : ""} />
                <div className="content">
                    <h6 className="title"><a href={`/cars/${this.props.id}`} style={{color:'black'}}>{this.props.title}</a></h6>
                    <p className="title" style={{marginTop:'-20%', fontWeight:500, fontSize: 15}}>{`${this.props.fromFormatted} - ${this.props.toFormatted}`}</p>
                    <ul className="attrs">
                        <li><Isvg src={fuel_icon} /> {this.props.fuel}</li>
                        <li><Isvg src={calendar_icon} /> {this.props.year}</li>
                        <li><Isvg src={guage_icon} /> {this.props.mileage}</li>
                    </ul>
                    <div className="divider"></div>
                    <div className="price-container">
                    <NavLink to={`/pricelist/${this.props.pricelist ? this.props.pricelist._id : null}`}><span className="price">{realPrice}/Day € <span style={{ color: 'green', marginRight: '10px' }}>{sale} %</span></span></NavLink>
                    </div>
                    {!this.props.userCar ?
                    <div className={this.state.addedToCart ? "addToCart-button-added" : "addToCart-button"} onClick={()=> {this.addToCart(this.props.id)}}>
                        <span style={{fontSize: 23}}><Isvg src={cartIcon}></Isvg>{this.state.addedToCart ? 'Added' : 'Add to cart'}</span> 
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default Article;