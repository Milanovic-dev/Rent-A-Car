import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Form from '../../components/forms/mileageReportForm';
import stripHtml from "string-strip-html";

import {
    Container,
    Row,
    Col,
} from 'reactstrap';



class MileageReport extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.state = {

        };
    }

    add(data) {

        // if (this.props[0].match.params.id){
        //     fetch(`https://localhost:8282/api/cars/v1/update`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('token')}`
        //         },
        //         body: JSON.stringify(data)
        //     }).then((res) => this.props[0].history.push('/cars'))


        // }else{

        data.newMileage ? data.newMileage = stripHtml(data.newMileage) : data.newMileage = "";
        data.additionalInfo ? data.additionalInfo = stripHtml(data.additionalInfo) : data.additionalInfo = "";

        fetch(`https://localhost:8282/api/cars/mileageReport/` + this.props[0].match.params.id + '/' + this.props[0].match.params.carId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then((res) => this.props[0].history.push('/completedRentals'))

    
    }
    componentDidMount() {
        this.get();

    }
    get() {
        // console.log(this.props[0].match.params);
         if (this.props[0].match.params.id) {
            fetch('https://localhost:8282/api/cars/mileageReport/get/' + this.props[0].match.params.id + '/' + this.props[0].match.params.carId, {
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

export default Page(MileageReport);