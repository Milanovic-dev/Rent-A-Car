import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Form from '../../components/forms/carForm';
import stripHtml from "string-strip-html";
import moment from 'moment';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';


const striptags = require('striptags');

class ChangeCar extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.state = {

        };
    }

    add(data) {
        data.make ? data.make = striptags(data.make) : data.make = "";
        data.model ? data.model = striptags(data.model) : data.model = "";
        data.productionYear ? data.productionYear = striptags(data.productionYear) : data.productionYear = "";
        data.mileage ? data.mileage = striptags(data.mileage) : data.mileage = "";
        data.limitMileage ? data.limitMileage = striptags(data.limitMileage) : data.limitMileage = "";
        data.power ? data.power = striptags(data.power) : data.power = "";
        data.seatCount ? data.seatCount = striptags(data.seatCount) : data.seatCount = "";
        data.location ? data.location = striptags(data.location) : data.location = "";
        // data.pricelist.pricePerDay ? data.pricelist.pricePerDay = striptags(data.pricelist.pricePerDay) : data.pricelist.pricePerDay = "";
        data.description ? data.description = striptags(data.description) : data.description = "";

        console.log(data);

        if (this.props[0].match.params.id) {
            fetch(`https://localhost:8282/api/cars/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/cars'))


        } else {
            fetch(`https://localhost:8282/api/cars/create`, {
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
            fetch('https://localhost:8282/api/cars/get/' + this.props[0].match.params.id, {
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

        fetch('https://localhost:8282/api/pricelist/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.state.pricelists = result;
            this.forceUpdate();
        })
        fetch('https://localhost:8282/api/make', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                makes: result.makes,
                models: result.models,
                classes: result.classes,
                fuels: result.fuels
            })
            // this.state.make = result;
            // this.forceUpdate();
        })

        
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
                            <Form initialValues={this.state.data} onSubmit={this.add} pricelist={this.state.pricelists} make={this.state.makes} model={this.state.models} classes={this.state.classes} fuel={this.state.fuels} />
                            :
                            <Form onSubmit={this.add} pricelist={this.state.pricelists} make={this.state.makes} model={this.state.models} classes={this.state.classes} fuel={this.state.fuels}/>
                    }
                </Container>
            </div>
        );
    }
}

export default Page(ChangeCar);