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

class Orders extends Component {
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
        
        fetch('http://localhost:8282/api/orders/all', {
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


    render() {

        return (
            <div className="page-wrap">
                <Container fluid className="table">
                    <Row className="page-title">
                        <Col lg="12">
                            <h3>Orders</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="7">
                            <span className="name">ID</span>
                        </Col>
                        <Col lg="5" className="actions">

                            <span className="name">OPTIONS</span>
                        </Col>
                    </Row>
                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>
                                    <Col lg="7">
                                        <span className="value">{item.car._id}</span>
                                    </Col>
                                    <Col lg="7">
                                        <span className="value">{item.car.make} {item.car.model} {item.car.location}</span>
                                    </Col>
                                    <Col lg="5" className="actions">
                                        <button></button>
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

export default Page(Orders);