import React, { Component } from 'react';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';
import FilterForm from '../components/forms/filterForm';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import { Link, Redirect } from 'react-router-dom';

import Map from '../components/map';
import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';

class Debts extends Component {
    constructor(props) {
        super(props);
        // this.searchProducts = this.searchProducts.bind(this);
        // this.fetchItems = this.fetchItems.bind(this);
        this.pay = this.pay.bind(this);
        this.get = this.get.bind(this);
        this.state = {
            items: []
        };
    }



    componentDidMount() {
        this.get();
    }
    get() {
        fetch('https://127.0.0.1:8080/orders/debts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                items: result
            })
        })
    }
    pay(id) {
        if (!localStorage.token) {
            return;
        }

        fetch('https://127.0.0.1:8080/orders/debts/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.get())
    }


    disallow(id) {
        // if (!localStorage.token) {
        //     return;
        // }



        // fetch('https://127.0.0.1:8080/review/disallow/' + id, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`

        //     },
        // }).then((res) => this.get())
    }



    render() {



        return (
            <div>
                {
                    !localStorage.getItem('token') ? <Redirect to={'/signin'}></Redirect> : null
                }
                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">
                    <Container className="table">
                        <Row className="page-title">
                            <Col lg="12">
                                <h3>DEBTS</h3>
                            </Col>
                        </Row>
                        <Row className="table-head">
                            <Col lg="5">
                                <span className="name">CAR</span>
                            </Col>
                            <Col lg="2">
                                <span className="name">OVERSTEP</span>
                            </Col>
                            <Col lg="2">
                                <span className="name">DEBT</span>
                            </Col>

                            <Col lg="3" className="actions">

                                <span className="name">OPTIONS</span>
                            </Col>
                        </Row>
                        {
                            this.state.items && this.state.items.map((item, idx) => {
                                return (

                                    <Row className="table-row" key={idx}>
                                        <Col lg="5">
                                            <span className="value">{item.carId} </span>
                                            {/* {
                                                item.car ?
                                                    <span className="value">{item.car.make} {item.car.model} {item.car.productionYear} </span>
                                                :
                                                <span className="value">{item.carId} </span>
                                            } */}

                                        </Col>
                                        <Col lg="2">
                                            <span className="value">{item.overstepMileage} </span>
                                        </Col>
                                        <Col lg="2">
                                            <span className="value">{item.debt} </span>
                                        </Col>

                                        <Col lg="3" className="actions">
                                            {
                                                item.status == "PAID" ?
                                                    <div className="btns">
                                                        <button className="button-paid">PAID</button>
                                                    </div>
                                                    :

                                                    <div className="btns">
                                                        <button className="button-allow" onClick={() => { this.pay(item._id) }}>PAY</button>
                                                    </div>

                                            }
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Container>


                    {/* <Footer {...this.props} /> */}


                </div>



            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(Debts));
