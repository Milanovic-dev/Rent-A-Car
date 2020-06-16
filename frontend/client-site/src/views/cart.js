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

        this.getMyCart.bind(this);
    }

    componentDidMount(){
        this.getMyCart().then(data => {console.log(this.state.orders)});
    }
    
    async getMyCart(){
        fetch('https://localhost:8080/orders/cart', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            const body = await res.json();
            this.state.orders = body;
            this.forceUpdate();
        }).catch(err => console.error(err));
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
                                <Form onSubmit={this.submit} data={this.state.orders}/>
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