import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Row,
    Col,
} from 'reactstrap';
import Text from './fields/text';

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

const renderItem = ({img, info, options, price}) => (
    <Col md="12" className="cart-item">
                        <span className="cart-item-image"><img src={img}></img></span>
                        <span className="cart-item-info">{info}</span>
                        <span className="cart-item-options">{options}</span>
                        <span className="cart-item-price">{price}$</span>
                </Col>
);

const cartForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;

    return (
        <form onSubmit={handleSubmit} className="contact-form space-form" style={{width:1000, marginLeft: -150}}>
            <Row>
                <Col md="12">
                    <h3>My Cart</h3>
                </Col>
            </Row>
                <Row>
                    <Col md="12" className="cart-owner-wrap">
                        AgentAdmin
                    </Col>
                </Row>
                <Row>
                <Col md="12" className="cart-item">
                        <span className="cart-item-image"><img src="./src/assets/images/about1.png"></img></span>
                        <span className="cart-item-info">BMW 150hp 2.0 Diesel</span>
                        <span className="cart-item-options">14.02-14.03</span>
                        <span className="cart-item-price">600$</span>
                </Col>    
                </Row>
                <Row>
                    <Col md="12">
                        <div className="input-wrap buttons">
                            <button type="submit" className="button">Place orders</button>
                        </div>
                    </Col>
                </Row>
            </form>
    )
}

export default reduxForm({
    form: 'cartForm'  // a unique identifier for this form
})(cartForm) 