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
        
        if(parseInt(result.status)/100 !== 2){
            return;
        }

        const json = await result.json();
        console.log(json);
        if(json){
            this.setState({
                items: json
            })
        }

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