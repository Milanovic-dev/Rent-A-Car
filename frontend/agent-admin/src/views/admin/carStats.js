import React, { Component } from 'react';
import Page from '../../containers/admin/page';
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

        // fetch('http://127.0.0.1:8282/api/cars/stats', {
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