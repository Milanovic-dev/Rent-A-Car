import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../../containers/admin/page';
import editIcon from '../../assets/svg/edit.svg';
import deleteIcon from '../../assets/svg/delete.svg';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

class CarStats extends Component {
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
        // if (!localStorage.token) {
        //     return;
        // }

        // fetch('http://127.0.0.1:8282/api/cars/v1/stats', {
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
        let result = [
            {
                make: "Audi",
                model: "A4",
                productionYear: "2010",
                class: "Saloon",
                color: "Silver",
                location: "Bijeljina",
                fule: "diesel",
                mileage: "140000",
                seatCount: "5",
                transmission: "Manual",
                most: "MILAGE"

            },
            {
                make: "Bmw",
                model: "M3",
                productionYear: "2012",
                class: "Saloon",
                color: "Silver",
                location: "Bijeljina",
                fule: "diesel",
                mileage: "110000",
                seatCount: "5",
                transmission: "Manual",
                most: "COMMENTS"

            },
            {
                make: "Bmw",
                model: "M3",
                productionYear: "2012",
                class: "Saloon",
                color: "Silver",
                location: "Bijeljina",
                fule: "diesel",
                mileage: "110000",
                seatCount: "5",
                transmission: "Manual",
                most: "RATING"

            }
        ];
        console.log(result);
        this.setState({
            items: result
        })

    }



    render() {

        return (
            <div className="page-wrap">
                <Container fluid className="table">
                    <Row className="page-title">
                        <Col lg="12">
                            <h3>Car statistic</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="2">
                            <span className="name">MOST</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">CAR</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">LOCATION</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">MILEAGE</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">RATING</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">COMMENTS</span>
                        </Col>
                    </Row>

                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>
                                    <Col lg="2">
                                        <span className="value">{item.most}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.make} {item.model}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.location}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.mileage}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.rating}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.numOfComment}</span>
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

export default Page(CarStats);