import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../../containers/admin/page';
import report from '../../assets/svg/edit.svg';
import deleteIcon from '../../assets/svg/delete.svg';
import car from '../../assets/svg/car-rental.svg'
import {
    Container,
    Row,
    Col
} from 'reactstrap';

class MileageReports extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        // this.delete = this.delete.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.get();
    }

    get() {
        // if (!localStorage.token) {
        //     return;
        // }

        fetch('http://localhost:8282/api/cars/completedRentals', {
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
        fetch('http://localhost:8282/api/cars/completedRentals/bundles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                data: result
            })
        })
        
    }

    render() {

        return (
            <div className="page-wrap">
                <Container fluid className="table">
                    <Row className="page-title">
                        <Col lg="12">
                            <h3>COMPLETED RENTALS</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="2">
                            <span className="name">TOTAL CARS</span>
                        </Col>
                        <Col lg="4">
                            <span className="name">ORDER ID</span>
                        </Col>
                        <Col lg="3">
                            <span className="name">OWNER ID</span>
                        </Col>
                        <Col lg="3">
                            <span className="name">RENTER ID</span>
                        </Col>

                    </Row>
                    {
                        this.state.items && this.state.items.map((item, idx) => {
                            return (
                                <Link to={`/order-preview/${item._id}`}>
                                    <Row className="table-row" key={idx}>
                                        <Col lg="2">
                                            <span className="value">{item.totalCars}</span>
                                        </Col>
                                        <Col lg="4">
                                            <span className="value">{item._id}</span>
                                        </Col>
                                        <Col lg="3">
                                            <span className="value">{item.ownerId}</span>
                                        </Col>
                                        <Col lg="3">
                                            <span className="value">{item.renterId}</span>
                                        </Col>

                                    </Row>
                                </Link>
                            )
                        })
                    }
                    {
                        this.state.data && this.state.data.map((item, idx) => {
                            return (
                                <Link to={`/order-preview/${item._id}`}>
                                    <Row className="table-row" key={idx}>
                                        <Col lg="2">
                                            <span className="value">{item.totalCars}</span>
                                        </Col>
                                        <Col lg="4">
                                            <span className="value">{item._id}</span>
                                        </Col>
                                        <Col lg="3">
                                            <span className="value">{item.ownerId}</span>
                                        </Col>
                                        <Col lg="3">
                                            <span className="value">{item.renterId}</span>
                                        </Col>

                                    </Row>
                                </Link>
                            )
                        })
                    }
                </Container>
            </div>
        );
    }
}

export default Page(MileageReports);