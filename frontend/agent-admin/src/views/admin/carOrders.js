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
        this.delete = this.delete.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.get();
    }
    
    get() {
        /*
        fetch('http://localhost:8282/api/cars/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log("MILANA");
            this.setState({
                items: result
            })
        })
        */
    }


    render() {

        return (
            <div className="page-wrap">
                <Container fluid className="table">
                    <Row className="page-title">
                        <Col lg="12">
                            <h3>Cars</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="7">
                            <span className="name">NAME</span>
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
                                        <span className="value">{item.make} {item.model} {item.location}</span>
                                    </Col>
                                    <Col lg="5" className="actions">
                                        <Link to={`/cars/${item._id}`}><Isvg src={editIcon} /></Link>
                                        <Link to={`/cars/busy/${item._id}`}><Isvg src={car} /></Link>
                                        <button onClick={() => this.delete(item._id)}><Isvg src={deleteIcon} /></button>
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