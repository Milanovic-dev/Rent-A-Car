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
        let result = [
            {
                '_id':'15156161',
                'make': 'audi',
                'model': 'a6',
                'productionYear': '2015',
                'dateStart': '15.06.2020',
                'dateEnd': '20.06.2020',
            }
        ];

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
                            <h3>COMPLETED RENTALS</h3>
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
                                        <Link to={`/mileageReport/${item._id}`}><Isvg src={report} /></Link>
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

export default Page(MileageReports);