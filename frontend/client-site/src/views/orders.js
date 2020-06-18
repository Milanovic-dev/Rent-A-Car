import React, { Component } from 'react';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/cartForm';
import Select from '../components/forms/fields/select'
import Isvg from 'react-inlinesvg';
import { Field, reduxForm } from 'redux-form'
import Tabs from '../components/forms/fields/tabs';

import {
    Container,
    Row,
    Col,
    Spinner
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


class Orders extends Component {
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

    async getMyBundles(){
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
                                        <button className={this.state.showingOrders ? "select-orders selected" : 'select-orders'} onClick={this.selectShow}>My Orders</button>
                                        <button className={!this.state.showingOrders ? "select-orders selected" : 'select-orders'} onClick={this.selectShow}>My Bundles</button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        !this.state.data ? <div><Spinner color="danger" /></div> : (
                                            this.state.data.length == 0 ? 'Nothing to show.' : ( this.state.data.map((item, i) => (
                                                <>
                                                <Col md="12" key={i}>
                                                    <span>order id: {item._id}</span>
                                                    <div className="order-item">
                                                        <div className="order-sidebar"></div>
                                                        <span className="order-item-img"><img src="./fsd.png" alt=""></img></span>
                                                        <span className="order-item-info">{`${item.car.make} ${item.car.model} ${item.car.power}kw ${item.car.fuel}`}</span>
                                                        <span className="order-item-options">{`${item.from} - ${item.to}`}</span>
                                                        <span className="order-item-price">{item.car.price}€</span>
                                                        <span className="order-item-owner">{item.ownerId}</span>
                                                        <span className="order-item-status">{item.status}</span>
                                                    </div>
                                                 </Col>
                                                 </>
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