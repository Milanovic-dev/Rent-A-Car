import React, { Component } from 'react'
import Page from '../../containers/admin/page';
import TestForm from '../../components/forms/testForm'
import {
    Container,
    Row,
    Col
} from 'reactstrap';

class Test extends Component {

    constructor(props) {
        super(props);
        this.add = this.add.bind(this);

        this.state = {
        };
    }

    add(data) {
   
        fetch(`https://localhost:8080/auth/processForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'CSRF-Token': data._csrf
            },
            body: JSON.stringify(data)
        })
    }
    
    componentDidMount() {
        fetch(`https://localhost:8080/auth/testForm`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                initialValues: result
            })
        })
    }


    render() {
        return (
            <div className="page-wrap">
                <Container fluid>

                    <Row className="page-title">
                        <Col lg="12">
                            <h3>Test</h3>
                        </Col>
                    </Row>

                    <TestForm onSubmit={this.add} initialValues={this.state.initialValues} />

                </Container>


            </div>
        )
    }
}

export default Page(Test)
