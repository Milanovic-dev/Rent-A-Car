import React, { Component } from 'react';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/cartForm';
import Select from '../components/forms/fields/select'
import Isvg from 'react-inlinesvg';
import { Field, reduxForm } from 'redux-form'
import Tabs from '../components/forms/fields/tabs';
import { NavLink, Link } from 'react-router-dom';
import Delete from '../assets/svg/delete.svg';

import {
    Container,
    Row,
    Col,
    Spinner,
    UncontrolledCollapse,
    Card,
    CardBody
} from 'reactstrap';
import { $CombinedState } from 'redux';

const renderTabsField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    children,
}) => (

        <Tabs
            {...input}
            children={children}
        />
    )


class Orders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showingOrders: true,
        }

        this.selectShow = this.selectShow.bind(this);
    }

    componentWillMount() {
        this.getMyOrders();
    }

    async getMyOrders() {
        fetch('https://localhost:8080/orders/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            const body = await res.json();
            this.state.data = body;
            this.forceUpdate();
        })
    }

    async getMyBundles() {
        fetch('https://localhost:8080/orders/bundles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            const body = await res.json();
            this.state.data = body;
            this.forceUpdate();
        })
    }

    async selectShow(e) {
        e.preventDefault();
        this.state.showingOrders = !this.state.showingOrders;
        this.state.data = undefined;
        this.forceUpdate();

        if (this.state.showingOrders) {
            this.getMyOrders();
        }
        else {
            this.getMyBundles();
        }

    }

    getStatusColor(status) {
        if (status == 'PENDING') {
            return '#FDA50F'
        } else if (status == 'CANCELED') {
            return 'red'
        } else {
            return 'green'
        }
    }

    renderItems(item, i) {
        if (this.state.showingOrders) {
            return this.renderOrders(item, i);
        }
        else {
            return this.renderBunldes(item, i);
        }
    }

    revokeOrder(e, id) {
        e.preventDefault();
        fetch(`https://localhost:8080/orders/revoke/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if (res.status == 200) {
                window.location.reload();
            }
        })
    }

    revokeBundle(e, id) {
        e.preventDefault();
        fetch(`https://localhost:8080/orders/bundles/revoke/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if (res.status == 200) {
                window.location.reload();
            }
        })
    }

    getDiscountedPrice(price, sale){
        if(!price) return 0;

        if(!sale) return price;

        let p = price;
        p -= ((p / 10) * (sale / 10));
        return p;
    }

    renderOrders(item, i) {
        return (
            <>
                <Col md="12" key={i}>
                    <span>order id: {item._id}</span>
                    <div className="order-item">
                        <div className="order-sidebar"></div>
                        <span className="order-item-img"><img width="120px" src={item.car.images ? item.car.images[0] : ""} alt=""></img></span>
                        <span className="order-item-info"><NavLink style={{ color: '#da212e' }} to={`/cars/${item.car._id}`}>{`${item.car.make} ${item.car.model} ${item.car.power}kw`}</NavLink></span>
                        <span className="order-item-options">{item.car.from && item.car.to ? `${item.car.fromFormatted} - ${item.car.toFormatted}` : 'N/A'}</span>
                        <span className="order-item-price"><NavLink style={{ color: '#da212e' }} to={`/pricelist/${item.car.pricelist._id}`}>{this.getDiscountedPrice(item.car.pricelist.pricePerDay, item.car.pricelist.sale)}/Day €</NavLink></span>
                        <span className="order-item-owner">{item.ownerId}</span>
                        <span className="order-item-status" style={{ color: this.getStatusColor(item.status) }}>{item.status}</span>
                        {item.status == 'PAID' ?
                            <span className="bundle-item-track"><Link to={`/tracking-simulator/${item._id}`}>GPS SIM </Link> </span>
                            :
                            null
                        }

                        <button disabled={item.status == "PAID"} className="cart-item-remove" style={{ borderStyle: 'none' }} onClick={(e) => this.revokeOrder(e, item._id)} style={{ backgroundColor: 'white' }}><Isvg src={Delete}></Isvg></button>
                    </div>
                </Col>
            </>
        )
    }

    renderBunldes(item, i) {
        return (
            <>
                <Col md="12" key={i}>
                    <span>bundle id: {item._id}</span>
                    <div className="bundle-item">
                        <div className="order-sidebar"></div>
                        <button className="bundle-item-info" id={`toggler${i}`}>Cars</button>
                        <span className="bundle-item-owner">{item.ownerId}</span>
                        <span className="bundle-item-status" style={{ color: this.getStatusColor(item.status) }}>{item.status}</span>
                        <button disabled={item.status == "PAID"} className="cart-item-remove" style={{ borderStyle: 'none' }} onClick={(e) => this.revokeBundle(e, item._id)} style={{ backgroundColor: 'white' }}><Isvg src={Delete}></Isvg></button>
                    </div>
                    <UncontrolledCollapse toggler={`#toggler${i}`}>
                        {item.cars.map((car, i) => {
                            return (
                                <Card>
                                    <CardBody>
                                        <div className="order-item">
                                            <span className="order-item-img"><img width="120px" src={car.images ? car.images[0] : ""} alt=""></img></span>
                                            <span className="order-item-info"><NavLink style={{ color: '#da212e' }} to={`/cars/${car._id}`}>{`${car.make} ${car.model} ${car.power}kw`}</NavLink></span>
                                            <span className="order-item-options">{car.from && car.to ? `${car.fromFormatted} - ${car.toFormatted}` : 'N/A'}</span>
                                            <span className="order-item-price"><NavLink style={{ color: '#da212e' }} to={`/pricelist/${car.pricelist._id}`}>{this.getDiscountedPrice(car.pricelist.pricePerDay, car.pricelist.sale)}/Day €</NavLink></span>
                                        </div>
                                    </CardBody>
                                </Card>)
                        })}
                    </UncontrolledCollapse>
                </Col>
            </>
        )
    }

    render() {
        return (
            <>
                <PageHeader page="My Orders" {...this.props}></PageHeader>
                <div className="page-wrap">
                    <Container>
                        <Row>
                            <Col lg="12" className="reg">
                                <form className="contact-form space-form" style={{ width: 1000, marginLeft: -150 }}>
                                    <Row>
                                        <Col md="12">
                                            <div className="select-header">
                                                <button className={this.state.showingOrders ? "select-orders selected" : 'select-orders'} onClick={this.selectShow}>Orders</button>
                                                <button className={!this.state.showingOrders ? "select-orders selected" : 'select-orders'} onClick={this.selectShow}>Bundles</button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {
                                            !this.state.data ? <div><Spinner color="danger" /></div> : (
                                                this.state.data.length == 0 ? 'Nothing to show.' : (this.state.data.map((item, i) => (
                                                    this.renderItems(item, i)
                                                ))
                                                )
                                            )
                                        }
                                    </Row>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer {...this.props}></Footer>
            </>
        )
    }
}

Orders = reduxForm({
    form: 'ordersForm', // a unique identifier for this form,
    initialValues: { condition: 'all' }
})(Orders)

export default Orders;
