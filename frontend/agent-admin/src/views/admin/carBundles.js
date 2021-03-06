import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../../containers/admin/page';
import editIcon from '../../assets/svg/edit.svg';
import deleteIcon from '../../assets/svg/delete.svg';
import car from '../../assets/svg/car-rental.svg'
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import accept from '../../assets/svg/done.svg';

class Bundles extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.get();
    }
    
    get() {
        
        fetch('https://localhost:8282/api/orders/bundles/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                items: result
            })
            console.log(this.state.items);
        })
        
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

    acceptOrder(e, id){
        e.preventDefault();

        fetch(`https://localhost:8282/api/orders/bundles/accept/${id}`, {
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

    declineOrder(e, id){
        e.preventDefault();

        fetch(`https://localhost:8282/api/orders/bundles/decline/${id}`, {
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
    finishOrder(e, id) {
        e.preventDefault();

        fetch(`https://localhost:8282/api/orders/bundles/finish/${id}`, {
            method: 'POST',
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

    render() {

        return (
            <div className="page-wrap">
                <Container fluid className="table">
                    <Row className="page-title">
                        <Col lg="12">
                            <h3>Bundles</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="3">
                            <span className="name">Id</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">Cars</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">Renter</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">Status</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">Options</span>
                        </Col>
                    </Row>
                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>
                                    <Col lg="3">
                                        <span className="name">{item._id}</span>
                                    </Col>
                                    <Col lg="2">
                                        {item.cars ? item.cars.map((car, i) => (
                                            <Row>
                                            <span className="name">{`${car && car.make} ${car && car.model} ${car && car.fuel}`}</span>
                                            </Row>
                                        )) : null}
                                    </Col>
                                    <Col lg="2">
                                        <span className="name">{item.renterId}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="name" style={{color: this.getStatusColor(item.status)}}>{item.status}</span>
                                    </Col>
                                    {
                                        !(item.status == "FINISHED") ?
                                        <>
                                            {
                                                item.status == "PAID" ?
                                                    <Col lg="1">
                                                        <span className="name"><button className="button" onClick={(e) => this.finishOrder(e, item._id)}>FINISH</button></span>
                                                    </Col>
                                                    :
                                                    <Col lg="1">
                                                        <span className="name"><button className={item.status == "PAID" || item.status == "PENDING" ? 'button' : 'button3'} disabled={item.status == 'PAID'} onClick={(e) => this.acceptOrder(e, item._id)}>Accept</button></span>
                                                    </Col>
                                            }

                                            < Col lg="1">
                                                <span className="name"><button className={item.status == "CANCELED" || item.status == "PENDING" ? 'button2' : 'button4'} disabled={item.status == 'CANCELED'} onClick={(e) => this.declineOrder(e, item._id)}>Decline</button></span>
                                            </Col>
                                        </>
                                        : null
                                    }
                                    {/* <Col lg="1">
                                        <span className="name"><button disabled={item.status == 'PAID' || item.status == "CANCELED"} onClick={(e) => this.acceptOrder(e, item._id)}>Accept</button></span>
                                    </Col> 
                                    <Col lg="1">
                                        <span className="name"><button disabled={item.status == 'CANCELED'} onClick={(e) => this.declineOrder(e, item._id)}>Decline</button></span>
                                    </Col>    */}
                                </Row>
                            )
                        })
                    }
                </Container>
            </div>
        );
    }
}

export default Page(Bundles);