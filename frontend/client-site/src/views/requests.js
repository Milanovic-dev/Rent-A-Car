import React, { Component } from 'react';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/cartForm';
import Select from '../components/forms/fields/select'
import Isvg from 'react-inlinesvg';
import { Field, reduxForm } from 'redux-form'
import Tabs from '../components/forms/fields/tabs';
import { NavLink } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Spinner,
    UncontrolledCollapse,
    Card,
    CardBody
} from 'reactstrap';

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


class Requests extends Component {
    constructor(props){
        super(props)

        this.state = {
            showingOrders: true,
        }

        this.selectShow = this.selectShow.bind(this);
    }

    componentWillMount(){
        this.getMyOrders();
    }

    async getMyOrders(){
        fetch('https://localhost:8080/orders/requests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            console.log(res);
            const body = await res.json();
            this.state.data = body;
            this.forceUpdate();
        })
    }

    async getMyBundles(){
        fetch('https://localhost:8080/orders/bundles/requests', {
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

    async selectShow(e){
        e.preventDefault();
        this.state.showingOrders = !this.state.showingOrders;
        this.state.data = undefined;
        this.forceUpdate();

        if(this.state.showingOrders){
            this.getMyOrders();
        }
        else
        {
            this.getMyBundles();
        }
        
    }

    getStatusColor(status){
        if(status == 'PENDING'){
            return '#FDA50F'
        }else if(status == 'CANCELED'){
            return 'red'
        }else
        {
            return 'green'
        }
    }

    handleAccept(e, id) {
        e.preventDefault();
        fetch(`https://localhost:8080/orders/accept/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if(res.status == 200){
                window.location.reload();
            }
        })
    }

    handleDecline(e, id) {
        e.preventDefault();
        fetch(`https://localhost:8080/orders/decline/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if(res.status == 200){
                window.location.reload();
            }
        })
    }

    handleBundleAccept(e, id) {
        e.preventDefault();
        fetch(`https://localhost:8080/orders/bundles/accept/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if(res.status == 200){
                window.location.reload();
            }
        })
    }

    handleBundleDecline(e, id) {
        e.preventDefault();
        fetch(`https://localhost:8080/orders/bundles/decline/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => {
            if(res.status == 200){
                window.location.reload();
            }
        })
    }

    renderItems(item, i){
        if(this.state.showingOrders){
            return this.renderOrders(item, i);
        }
        else
        {
            return this.renderBunldes(item,i);
        }
    }

    renderOrders(item, i){
        console.log(item);
        return (
        <>
            <Col md="12" key={i}>
                <span>order id: {item._id}</span>
                <div className="order-item">
                    <div className="order-sidebar"></div>
                    <span className="order-item-img"><img width="120px" src={item.car.images ? item.car.images[0] : ""} alt=""></img></span>
                    <span className="order-item-info"><NavLink style={{color:'#da212e'}} to={`/cars/${item.car._id}`}>{`${item.car.make} ${item.car.model} ${item.car.power}kw`}</NavLink></span>
                    <span className="order-item-options">{item.from && item.to ? `${item.from} - ${item.to}` : 'N/A'}</span>
                    <span className="order-item-price">{item.car.price}€</span>
                    <span className="order-item-owner">{item.renterId}</span>
                    <span className="order-item-status" style={{color: this.getStatusColor(item.status)}}>{item.status}</span>
                    {item.status == 'PENDING' ? (<>
                    <button className="request-item-accept" onClick={(e) => this.handleAccept(e, item._id)}>Accept</button>
                    <button className="request-item-decline" onClick={(e) => this.handleDecline(e, item._id)}>Decline</button> </>)
                    : null}
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
                    <span className="bundle-item-owner">{item.renterId}</span>
                    <span className="bundle-item-price">{item.price}€<span style={{color:'green'}}>{` (-20%)`}</span></span>
                    <span className="bundle-item-status" style={{color: this.getStatusColor(item.status)}}>{item.status}</span>
                    {item.status == 'PENDING' ? (<>
                    <button className="request-item-accept" onClick={(e) => this.handleBundleAccept(e, item._id)}>Accept</button>
                    <button className="request-item-decline" onClick={(e) => this.handleBundleDecline(e, item._id)}>Decline</button>
                    </>) : null}
                </div>
                    <UncontrolledCollapse toggler={`#toggler${i}`}>
                    {item.cars.map((car, i) => { return (
                        <Card>
                            <CardBody>
                            <div className="order-item">
                                <span className="order-item-img"><img width="120px" src={car.images ? car.images[0] : ""} alt=""></img></span>
                                <span className="order-item-info"><NavLink style={{color:'#da212e'}} to={`/cars/${car._id}`}>{`${car.make} ${car.model} ${car.power}kw `}</NavLink></span>
                                <span className="order-item-options">{car.from && car.to ? `${car.from} - ${car.to}` : 'N/A'}</span>
                                <span className="order-item-price">{car.price}€</span>
                            </div>
                            </CardBody>
                        </Card>)
                    })}
                    </UncontrolledCollapse>
            </Col>
        </>
        )
    }

    render(){
        return (
            <>
            <PageHeader page="My Orders" {...this.props}></PageHeader>
            <div className="page-wrap">
                <Container>
                        <Row>
                            <Col lg="12" className="reg">
                            <form className="contact-form space-form" style={{width:1000, marginLeft: -150}}>
                                <Row>
                                    <Col md="12">
                                        <div className="select-header">
                                        <button className={this.state.showingOrders ? "select-orders selected" : 'select-orders'} onClick={this.selectShow}>Order Requests</button>
                                        <button className={!this.state.showingOrders ? "select-orders selected" : 'select-orders'} onClick={this.selectShow}>Bundles Requests</button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        !this.state.data ? <div><Spinner color="danger" /></div> : (
                                            this.state.data.length == 0 ? 'Nothing to show.' : ( this.state.data.map((item, i) => (
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

Requests = reduxForm({
    form: 'requestsForm', // a unique identifier for this form,
    initialValues: { condition: 'all' }
})(Requests)

export default Requests;