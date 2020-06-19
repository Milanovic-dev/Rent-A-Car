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
        
        };
    }

    componentDidMount() {
        this.get();
    }

    get() {
        // if (!localStorage.token) {
        //     return;
        // }

        // fetch('https://localhost:8282/api/cars/completedRentals', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     },
        // }).then((res) => res.json()).then((result) => {
        //     this.setState({
        //         items: result
        //     })
        // })
        let obj = {
            '_id': '15156161',
            'cars': [
                {
                    'carId': '33333',
                    'make': 'audi',
                    'model': 'a6',
                    'productionYear': '2015',
                    'dateStart': '15.06.2020',
                    'dateEnd': '20.06.2020',
                    'rentedCar': 'audi a6 2015'
                },
                {
                    'carId': '2222',
                    'make': 'bmw',
                    'model': 'x3',
                    'productionYear': '2015',
                    'dateStart': '15.06.2020',
                    'dateEnd': '20.06.2020',
                    'rentedCar': 'bmw x3 2015'
                },
                {
                    'carId': '11111',
                    'make': 'golf',
                    'model': 'mk7',
                    'productionYear': '2015',
                    'dateStart': '15.06.2020',
                    'dateEnd': '20.06.2020',
                    'rentedCar': 'audi a6 2015'
                }
            ],
            'totalCars': '3'

        };
        this.setState({
            data: obj
        });
        this.setState({
            items: obj.cars
        });
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
                        this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>
                                    <Col lg="4">
                                        <span className="value">{item.make} {item.model} {item.productionYear}</span>
                                    </Col>
                                    <Col lg="4">
                                        <span className="value">{item.dateStart} - {item.dateEnd}</span>
                                    </Col>
                                    <Col lg="4" className="actions">
                                        <Link to={`/mileageReport/${item.carId}`}><Isvg src={report} /></Link>
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