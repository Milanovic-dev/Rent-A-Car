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
            orders: []
        };
    }

    addToCart(ownerId, renterId, car){
        let flag = false;
        for(const order of this.state.orders){
            if(order.ownerId == ownerId){
                if(!order.carOrders) order.carOrders = [];
                order.carOrders.push(car);
                flag = true;
            }
        }

        if(!flag){
            this.state.orders.push({
                ownerId,
                isBundle: false,
                carOrders: [car]
            })
        }

        this.state.renterId = renterId;
    }

    submit(data) {
        fetch('https://localhost:8080/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.status == '201'){
                //Redirect
            }
        }).catch(err => {
            console.error(err);
        })
    }


    render() {
        return (
            <>
                <PageHeader page="My Cart" {...this.props} />
                <div className="page-wrap">
                <Container>
                        <Row>
                            <Col lg="12" className="reg">
                                <Form onSubmit={this.submit} data={{orders:this.state.orders, renterId: this.state.renterId}}/>
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