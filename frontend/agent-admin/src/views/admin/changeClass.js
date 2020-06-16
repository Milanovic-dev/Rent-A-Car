import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Form from '../../components/forms/classForm';

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
            fetch(`https://localhost:8080/class/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/classes'))


        }else{
            fetch(`https://localhost:8080/class/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/classes'))


        }
    }
    componentDidMount() {
        this.get();

    }
    get() {
         if (this.props[0].match.params.id) {
            fetch('https://localhost:8080/class/get/' + this.props[0].match.params.id, {
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