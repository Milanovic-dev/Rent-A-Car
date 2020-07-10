import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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

class Pricelists extends Component {
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
        fetch('https://localhost:8282/api/pricelist/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);
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
                            <h3>Pricelists</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="2">
                            <span className="name">ID</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">PRICE/DAY</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">PRICE/KM</span>
                        </Col>
                        <Col lg="2">
                            <span className="name">Sale</span>
                        </Col>
                        <Col lg="2" className="actions">
                            <span className="name">OPTIONS</span>
                        </Col>
                    </Row>
                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>
                                    <Col lg="2">
                                    <span className="value">{item._id}</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.pricePerDay}€</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.pricePerKM}€</span>
                                    </Col>
                                    <Col lg="2">
                                        <span className="value">{item.sale}%</span>
                                    </Col>
                                    <Col lg="3" className="actions">
                                        <NavLink to={`/pricelist/${item._id}`}><button><Isvg src={editIcon} /></button></NavLink>
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

export default Page(Pricelists);