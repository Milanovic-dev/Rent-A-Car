import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Select from '../../components/forms/fields/select'

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
            cars: [],
            comments: [],
            sort: 0
        };
    }

    componentDidMount() {
        this.get();

    }

    get() {
        // if (!localStorage.token) {
        //     return;
        // }

        fetch('https://localhost:8282/api/cars/stats/' + this.state.sort, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                cars: result
            })
        })
        let res = [
            {
                'id': '2',
                'make': 'Volkswagen',
                'model': 'Golf 4',
                'productionYear': '2000',
                'mileage': '250000',
                'price': '30',
                'comments:': [
                    {
                        'id': '1',
                        'carId': '2',
                        'rate': '4',
                        'comment': 'dobar',
                        'userId': 'x'
                    },
                    {
                        'id': '2',
                        'carId': '2',
                        'rate': '4',
                        'comment': 'dobar',
                        'userId': 'x'
                    },
                    {
                        'id': '7',
                        'carId': '2',
                        'rate': '4',
                        'comment': 'dobar',
                        'userId': 'x'
                    }
                ],
                'totalComments': '3',
                'avgRate': '4'
            },
            {
                'id': '3',
                'make': 'Audi',
                'model': 'A3',
                'productionYear': '2008',
                'mileage': '220000',
                'price': '40',
                'comments': [
                    {
                        'id': '3',
                        'carId': '3',
                        'rate': '4',
                        'comment': 'ok',
                        'userId': 'x'
                    },
                    {
                        'id': '8',
                        'carId': '3',
                        'rate': '5',
                        'comment': 'dobar',
                        'userId': 'x'
                    }
                ],
                'totalComments': '2',
                'avgRate': '4.5'
            },
            {
                'id': '4',
                'make': 'Opel',
                'model': 'Corsa',
                'productionYear': '2011',
                'mileage': '112000',
                'price': '40',
                'comments': [
                    {
                        'id': '4',
                        'carId': '4',
                        'rate': '2',
                        'comment': 'dobar',
                        'userId': 'x'
                    }
                ],
                'totalComments': '1',
                'avgRate': '2'
            },
            {
                'id': '5',
                'make': 'Peugeot',
                'model': '308',
                'productionYear': '2009',
                'mileage': '145000',
                'price': '40',
                'comments': [
                    {
                        'id': '5',
                        'carId': '5',
                        'rate': '5',
                        'comment': 'dobar',
                        'userId': 'x'
                    },
                    {
                        'id': '6',
                        'carId': '5',
                        'rate': '5',
                        'comment': 'dobar',
                        'userId': 'x'
                    },
                ],
                'totalComments': '2',
                'avgRate': '5'
            }
        ];
        if(this.state.sort == 0){
            res.sort((a, b) => a.mileage > b.mileage ? -1 : 1);
        }else if(this.state.sort == 1){
            res.sort((a, b) => a.totalComments > b.totalComments ? -1 : 1);
        }else if(this.state.sort == 2){
            res.sort((a, b) => a.avgRate > b.avgRate ? -1 : 1);
        }
        

        // this.setState({
        //     cars: res
        // })
        // console.log(res);

    }



    render() {

        return (
            <div className="page-wrap">
                <Container fluid className="table">
                    <Row className="page-title">
                        <Col lg="8">
                            <h3>CARS STATISTIC</h3>
                        </Col>
                        <Col lg="4">
                            <Select placeholder="Sort by" onChange={(val) => this.setState({ sort: val }, this.get)} value={this.state.sort}>
                                <option value={0}>Mileage</option>
                                <option value={1}>Number of comments</option>
                                <option value={2}>Rate</option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="table-head">

                        <Col lg="2">
                            <span className="name">MAKE</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">MODEL</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">PRODUCTION YEAR</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">MILEAGE</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">COMMENTS</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">RATE</span>
                        </Col>


                    </Row>

                    {
                        this.state.cars.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>

                                    <Col lg="2">
                                        <span className="value">{item.make} </span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.model}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.productionYear}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.mileage}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.totalComments}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.avgRate}</span>
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