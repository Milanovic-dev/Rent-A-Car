import React, { Component } from 'react';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/cartForm';


import {
    Container,
    Row,
    Col,
    CarouselItem,
} from 'reactstrap';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
        };

        this.getMyCart = this.getMyCart.bind(this);
        this.checkBundle = this.checkBundle.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount(){
        if(!localStorage.getItem('token')){
            this.props[0].history.push('/signin')
        }

        this.getMyCart();
    }
    
    getMyCart(){
        fetch('https://localhost:8080/orders/cart', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            const body = await res.json();
            this.state.orders = body;
            for(const item of this.state.orders){
                item.isBundle = false;
            }
            this.forceUpdate();
        }).catch(err => console.error(err));
    }

    submit(data) {
        fetch('https://localhost:8080/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.state.orders)
        }).then(res => {
            if(res.status == '201'){
                this.props[0].history.push('/ads');
            }
        }).catch(err => {
            console.error(err);
        })
    }

    checkBundle(ownerId){
        for(const item of this.state.orders){
            if(item.ownerId == ownerId){
                item.isBundle = !item.isBundle;
            }
        }
    }


    render() {
        return (
            <>
                <PageHeader page="My Cart" {...this.props} />
                <div className="page-wrap">
                <Container>
                        <Row>
                            <Col lg="12" className="reg">
                                <Form onSubmit={this.submit} data={this.state.orders} checkBundle={this.checkBundle}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer {...this.props} />
            </>
        );
    }

}


export default Cart; 