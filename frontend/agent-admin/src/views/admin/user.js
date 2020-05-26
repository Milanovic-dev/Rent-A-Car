import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../../containers/admin/page';
import UserForm from '../../components/forms/userForm'
import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        let result =
        {
            _id: "1",
            firstName: "Aleksandar",
            lastName: "Dabic",
            email: "acodabic1997@gmail.com"
        };
        this.setState({
            initialValues: result
        })
    }


    render() {
        return (
            <div className="page-wrap">
                <Container fluid>

                    <Row className="page-title">
                        <Col lg="12">
                            <h3>User page ( ID: {this.props[0].match.params.id})</h3>
                        </Col>
                    </Row>

                    <UserForm initialValues={this.state.initialValues} />

                    {/* {
                        this.state.error ?

                            <p>{this.state.error}</p>
                            :
                            null
                    } */}
                </Container>


            </div>
        )
    }
}

export default Page(User)
