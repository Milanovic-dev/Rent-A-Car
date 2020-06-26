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

class OrderPreview extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        // this.delete = this.delete.bind(this);

        this.state = {
            items: [],
            bundle: 0
        };
    }

    componentDidMount() {
        this.get();
    }

    get() {
        // if (!localStorage.token) {
        //     return;
        // }
        fetch('https://localhost:8282/api/cars/completedRentals/' + this.props[0].match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {

            if (result.totalCars != '1') {
                this.setState({
                    data: result,
                    items: result.carIds,
                    bundle: 1
                })
            } else {
                this.setState({
                    data: result,
                })
            }

        })

    }

    render() {

        return (
            <div className="page-wrap">
                <Container fluid className="table">
                    <Row className="page-title">
                        <Col lg="12">
                            {
                                this.state.data ?
                                    <>
                                        <h3>Order: {this.state.data._id}</h3>
                                        <h6>Owner id: {this.state.data.ownerId}</h6>
                                        <h6>Renter id: {this.state.data.renterId}</h6>
                                        <h6>Total cars: {this.state.data.totalCars}</h6>
                                    </>
                                    : null
                            }
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="4">
                            <span className="name">CAR</span>
                        </Col>
                        <Col lg="4">
                            <span className="name">DATE</span>
                        </Col>
                        <Col lg="4" className="actions">
                            <span className="name">OPTIONS</span>
                        </Col>
                    </Row>
                    {
                        this.state.data && this.state.bundle == 0 ?
                            <Row className="table-row">
                                <Col lg="4">
                                    <span className="value">{this.state.data.car.make} {this.state.data.car.model} {this.state.data.car.productionYear}</span>
                                </Col>
                                <Col lg="4">
                                    <span className="value">{this.state.data.car.from} - {this.state.data.car.to}</span>
                                </Col>
                                <Col lg="4" className="actions">
                                    <Link to={`/mileageReport/${this.state.data._id}/${this.state.data.car._id}`}><Isvg src={report} /></Link>
                                </Col>
                            </Row>

                            :
                            this.state.items.map((item, idx) => {
                                return (
                                    <Row className="table-row" key={idx}>
                                        <Col lg="4">
                                            <span className="value">{item.make} {item.model} {item.productionYear}</span>
                                        </Col>
                                        <Col lg="4">
                                            <span className="value">{item.from} - {item.to}</span>
                                        </Col>
                                        <Col lg="4" className="actions">
                                            <Link to={`/mileageReport/${this.state.data._id}/${item._id}`}><Isvg src={report} /></Link>
                                        </Col>
                                    </Row>
                                )
                            }) 
                            
                    }

                </Container>
            </div>
        );
    }
}

export default Page(OrderPreview);