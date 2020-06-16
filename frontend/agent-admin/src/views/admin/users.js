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

    async get() {
        // if (!localStorage.token) {
        //     return;
        // }

        const result = await fetch('https://localhost:8080/auth/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (parseInt(result.status) / 100 !== 2) {
            return;
        }

        const json = await result.json();
        console.log(json);
        if (json) {
            this.setState({
                items: json
            })
        }

    }

    allow = (id) => {
        fetch(`https://localhost:8080/auth/users/update/status/${id}/0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => {
            this.get();
        });

    }
    disallow = (id) => {
        fetch(`https://localhost:8080/auth/users/update/status/${id}/1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => {
            this.get();
        });

    }

    delete = (id) => {
        if (!localStorage.token) {
            return;
        }

        fetch('https://127.0.0.1:8080/auth/users/remove/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.get())
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
                        <Col lg="3">
                            <span className="name">NAME</span>
                        </Col>
                        <Col lg="3">

                            <span className="name">EMAIL</span>
                        </Col>
                    </Row>
                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>
                                    <Col lg="3">
                                        <span className="value">{item.firstName} {item.lastName}</span>
                                    </Col>
                                    <Col lg="3">
                                        <span className="value">{item.email}</span>
                                    </Col>
                                    {
                                        item.role === 'user' ?
                                            <Col lg="3">
                                                {item.status === 1 ?
                                                    <button className="button" style={{ backgroundColor: 'red' }} onClick={() => { this.allow(item._id) }}>UNBLOCK</button>
                                                    :
                                                    <button className="button" onClick={() => { this.disallow(item._id) }}>BLOCK</button>
                                                }
                                            </Col>
                                            :
                                            <Col lg="3">
                                            </Col>
                                    }
                                    <Col lg="3" className="actions">
                                        <Link to={`/users/${item._id}`}><Isvg src={editIcon} /></Link>
                                        {
                                            item.role === 'user' ?

                                                <button onClick={() => this.delete(item._id)}><Isvg src={deleteIcon} /></button>
                                                :
                                                null
                                        }
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

export default Page(Users);