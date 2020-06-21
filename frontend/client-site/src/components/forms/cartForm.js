import React from 'react';
import { useState } from 'react'; 
import { Field, reduxForm } from 'redux-form'
import {
    Row,
    Col,
    Spinner
} from 'reactstrap';
import Text from './fields/text';
import { NavLink } from 'react-router-dom';

const renderTextField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
}) => (

        <Text
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            {...input}
        />
    )


const cartForm = (props) => {
    const { handleSubmit, pristine, submitting, data, checkBundle } = props;

    const removeFromCart = (id) => {
        fetch(`https://localhost:8080/orders/cart/remove/${id}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if(res.status == '200'){
                console.log('Deleted');
                window.location.reload();
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form space-form" style={{width:1000, marginLeft: -150}}>
            <Row>
                <Col md="12">
                    <h3>My Cart</h3>
                </Col>
            </Row>             
                {
                    !data ? <div><Spinner color="danger" /></div> : data.length > 0 ? data.map((item, i) => {
                        return (
                        <>
                            <Row key={i}>
                                <Col md="12" className="cart-owner-wrap">
                                    <span className="cart-owner">{item.ownerId}</span>
                                    {item.cars.length > 1 ? (
                                    <span className="cart-isBundle">
                                        <span >isBundle</span>
                                        <input type="checkbox" className="checkbox" onClick={()=> checkBundle(item.ownerId)}/>
                                    </span>)
                                    : null}
                                </Col>
                            </Row>
                            <Row>
                            {item.cars ? item.cars.map((item, i) => {
                                return (
                                <Col md="12" className="cart-item" key={i}>
                                    <span className="cart-item-image"><img width="120px" src={item.images ? item.images[0] : ""}></img></span>
                                    <span className="cart-item-info"><NavLink style={{color:'#da212e'}} to={`/cars/${item._id}`}>{`${item.make} ${item.model} ${item.power}kw ${item.fuel}`}</NavLink></span>
                                    <span className="cart-item-options">{item.from && item.to ? `${item.from} - ${item.to}`: `N/A`}</span>
                                    <span className="cart-item-price">{item.price}€</span>
                                    <span className="cart-item-remove" onClick={()=> {removeFromCart(item._id)}}><img src="../../assets/images/Rectangle 587.png"></img></span>
                                </Col>
                                )
                            }) : null}
                            </Row>
                        </>
                        )
                    }) : (<h5>Cart is empty</h5>)
                }              
                <Row>
                    <Col md="12">
                        <div className="input-wrap buttons">
                            <button type="submit" disabled={data && data.length == 0} className={data && data.length > 0 ? "button" : "button disabled"} style={{marginLeft:'-1%', marginTop:'5%'}}>Place orders</button>
                        </div>
                    </Col>
                </Row>
            </form>
    )
}

export default reduxForm({
    form: 'cartForm'  // a unique identifier for this form
})(cartForm) 