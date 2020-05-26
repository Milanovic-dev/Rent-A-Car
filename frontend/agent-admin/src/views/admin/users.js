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

class Users extends Component {
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

        // fetch('http://127.0.0.1:8282/api/cars/v1/all', {
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
                _id: "1",
                firstName: "Aleksandar",
                lastName: "Dabic",
                email: "acodabic1997@gmail.com"
            },
            {
                _id: "2",
                firstName: "Milan",
                lastName: "Stanojevic",
                email: "milan.stanojevic@gmail.com"
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
                            <h3>Users</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="6">
                            <span className="name">NAME</span>
                        </Col>
                        <Col lg="6">

                            <span className="name">EMAIL</span>
                        </Col>
                    </Row>
                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Link to={`/users/${item._id}`}>
                                    <Row className="table-row" key={idx}>
                                        <Col lg="6">
                                            <span className="value">{item.firstName} {item.lastName}</span>
                                        </Col>
                                        <Col lg="6">
                                            <span className="value">{item.email}</span>
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

export default Page(Users);