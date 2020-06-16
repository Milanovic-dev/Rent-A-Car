import React, { Component } from 'react'
import Page from '../../containers/admin/page';
import UserForm from '../../components/forms/userForm'
import {
    Container,
    Row,
    Col
} from 'reactstrap';

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        // let result =
        // {
        //     _id: "1",
        //     firstName: "Aleksandar",
        //     lastName: "Dabic",
        //     email: "acodabic1997@gmail.com"
        // };
        // this.setState({
        //     initialValues: result
        // })


        fetch(`https://localhost:8080/auth/users/` + this.props[0].match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                initialValues: result[0]
            })
        })


    }


    render() {
        return (
            <div className="page-wrap">
                <Container fluid>

                    <Row className="page-title">
                        <Col lg="12">
                            <h3>User page</h3>
                        </Col>
                    </Row>
                    {
                        this.state.initialValues ? <UserForm initialValues={this.state.initialValues} /> : null
                    }

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
