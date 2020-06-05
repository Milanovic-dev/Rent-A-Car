import React, { Component } from 'react';
import Page from '../../containers/admin/page';
import Form from '../../components/forms/busyCarForm';
import stripHtml from "string-strip-html";

import {
    Container,
    Row,
    Col,
} from 'reactstrap';



class BusyCar extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.state = {

        };
    }

    add(data) {
        console.log(data);
        let obj = {};
        obj.id =  this.props[0].match.params.id;
        obj.busyFrom = data.dateFrom;
        obj.busyTo = data.dateTo;
        console.log(obj);
        fetch(`https://localhost:8080/cars/busy`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(obj)
            }).then((res) => this.props[0].history.push('/cars'))
    }
    componentDidMount() {
        this.get();

    }
    get() {
        //  if (this.props[0].match.params.id) {
        //     fetch('https://localhost:8080/cars/get/' + this.props[0].match.params.id, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('token')}`
        //         },
        //     }).then((res) => res.json()).then((result) => {
        //         this.setState({
        //             data: result
        //         })
        //     });
        // }
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
                    
                    <Form onSubmit={this.add} />
                </Container>
            </div>
        );
    }
}

export default Page(BusyCar);