import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Form from '../../components/forms/carForm';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';



class ChangeCar extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.state = {

        };
    }

    add(data) {

        if (this.props[0].match.params.id){
            fetch(`http://localhost:8282/api/cars/v1/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/cars'))


        }else{
            fetch(`http://localhost:8282/api/cars/v1/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/cars'))


        }
    }
    componentDidMount() {
        this.get();

    }
    get() {
         if (this.props[0].match.params.id) {
            fetch('http://localhost:8282/api/cars/v1/get/' + this.props[0].match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then((res) => res.json()).then((result) => {
                this.setState({
                    data: result
                })
            });
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

export default Page(ChangeCar);