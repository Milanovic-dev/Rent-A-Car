import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Form from '../../components/forms/modelForm';
import stripHtml from "string-strip-html";

import {
    Container,
    Row,
    Col,
} from 'reactstrap';



class ChangeModel extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.state = {

        };
    }

    add(data) {
        /*data.make ?  data.make = stripHtml(data.make) : data.make = "";
        data.model ?  data.model = stripHtml(data.model) : data.model = "";
        data.productionYear ?  data.productionYear = stripHtml(data.productionYear) : data.productionYear = "";
        data.mileage ?  data.mileage = stripHtml(data.mileage) : data.mileage = "";
        data.limitMileage ?  data.limitMileage = stripHtml(data.limitMileage) : data.limitMileage = "";
        data.power ?  data.power = stripHtml(data.power) : data.power = "";
        data.seatCount ?  data.seatCount = stripHtml(data.seatCount) : data.seatCount = "";
        data.location ?  data.location = stripHtml(data.location) : data.location = "";
        data.price ?  data.price = stripHtml(data.price) : data.price = "";
        data.description ?  data.description = stripHtml(data.description) : data.description = "";*/

        if (this.props[0].match.params.id){
            fetch(`https://localhost:8080/model/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/makes'))


        }else{
            fetch(`https://localhost:8080/model/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/makes'))


        }
    }
    componentDidMount() {
        this.get();

    }
    get() {
        fetch('https://127.0.0.1:8080/make/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                makes: result
            })
        })


         if (this.props[0].match.params.id) {
            fetch('https://localhost:8080/model/get/' + this.props[0].match.params.id, {
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
                    <Form makes={this.state.makes} initialValues={this.state.data} onSubmit={this.add} />
                        :
                        <Form makes={this.state.makes} onSubmit={this.add} />

                    }
                </Container>
            </div>
        );
    }
}

export default Page(ChangeModel);