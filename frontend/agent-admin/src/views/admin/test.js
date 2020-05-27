import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../../containers/admin/page';
import TestForm from '../../components/forms/testForm'
import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';

class Test extends Component {

    constructor(props) {
        super(props);
        this.add = this.add.bind(this);

        this.state = {
        };
    }

    add(data) {
   
        // if (this.props[0].match.params.id){
        //     fetch(`http://localhost:8282/api/cars/v1/update`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('token')}`
        //         },
        //         body: JSON.stringify(data)
        //     }).then((res) => this.props[0].history.push('/cars'))


        // }else{
        //     fetch(`http://localhost:8282/api/cars/v1/create`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('token')}`
        //         },
        //         body: JSON.stringify(data)
        //     }).then((res) => this.props[0].history.push('/cars'))


        // }
    }
    
    componentDidMount() {
       
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

                    <TestForm onSubmit={this.add}/>

                </Container>


            </div>
        )
    }
}

export default Page(Test)
