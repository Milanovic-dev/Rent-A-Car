import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Form from '../../components/forms/pricelistForm';
import stripHtml from "string-strip-html";
import moment from 'moment';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';


const striptags = require('striptags');

class ChangePricelist extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.state = {

        };
    }

    add(data) {
        console.log(data);
        
        if (this.props[0].match.params.id) {
            fetch(`https://localhost:8282/api/pricelist/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/pricelists'))


        } else {
            fetch(`https://localhost:8282/api/pricelist/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/pricelists'))


        }
    }
    componentDidMount() {
        this.get();

    }
    get() {
        if (this.props[0].match.params.id) {
            fetch(`https://localhost:8282/api/pricelist/get/${this.props[0].match.params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(async (res) => {
                const data = await res.json();
                this.setState({
                    data
                })
            })
        }

    }

    render() {
        return (
            <div className="page-wrap">
                {/*
                    !localStorage.token ? <Redirect to='/login' /> : null
                */}
                <Container fluid>
                    <Row className="page-title">
                        <Col lg="12">
                        </Col>
                    </Row>
                    {
                        this.state.data ?
                            <Form initialValues={this.state.data} onSubmit={this.add} />
                            :
                            <Form onSubmit={this.add} />
                    }
                </Container>
            </div>
        );
    }
}

export default Page(ChangePricelist);