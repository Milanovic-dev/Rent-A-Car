import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import LoginForm from '../../components/forms/testLoginForm';
import bg from '../../assets/images/login-bg.png';

import {
    Container,
    Row,
    Col
} from 'reactstrap';


class TestLogin extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
        };
    }

    login(data) {

        fetch('https://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        }).then((res) => res.json()).then((result) => {
            if (!result.error) {
                this.setState({
                    token: result.token,
                    error: null
                })
            } else {
                this.setState({
                    error: result.error,
                    token: null
                })
            }
        })
    }

    test = (route) => {
        this.setState({
            result: null,
            resultStatus: null
        }, () => {
            fetch('https://localhost:8080'+route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.state.token}`
                },
            }).then((res) => {
                this.setState({
                    resultStatus: res.status
                })
                return res.json()
            }).then((result) => {
                this.setState({
                    result
                })
            })

        })

    }

    render() {
        return (
            <div className="login-page">
                <Container className="block-wrap">
                    <Row>
                        <Col lg="12">
                            <Container>
                                <Row className="login-container">

                                    <Col lg="6" xs="6" className="login-form">
                                        <Container>
                                            <Row>
                                                <Col lg="12">
                                                    <h3>Test login page</h3>
                                                    <h6></h6>
                                                </Col>
                                            </Row>
                                            <LoginForm onSubmit={this.login} />
                                            {
                                                this.state.error ?
                                                    <p>{this.state.error}</p>
                                                    :
                                                    null
                                            }


                                        </Container>
                                    </Col>

                                    <Col lg="6" xs="6" className="login-form">
                                        <Container>
                                            <Row>
                                                <Col lg="12">
                                                    <h6 style={{ color: '#fff' }}>Token:</h6>
                                                    <pre style={{ color: 'green', minHeight: 50 }}> {this.state.token}</pre>

                                                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                                                        <button className="button" style={{ fontSize: 12, marginBottom: 10 }} onClick={() => this.test('/auth/users/test/testroute1')}>/auth/users/test/testroute1</button>
                                                        <button className="button" style={{ fontSize: 12, marginBottom: 10 }} onClick={() => this.test('/auth/users/test/testroute2')}>/auth/users/test/testroute2</button>
                                                        <button className="button" style={{ fontSize: 12, marginBottom: 10 }} onClick={() => this.test('/auth/users/test/testroute3')}>/auth/users/test/testroute3</button>
                                                        <button className="button" style={{ fontSize: 12, marginBottom: 10 }} onClick={() => this.test('/auth/users/test/testroute4')}>/auth/users/test/testroute4</button>
                                                    </div>

                                                    <h6 style={{ color: '#fff', marginTop: 50 }}>Result</h6>
                                                    <p style={{ color: '#fff' }}>Status: {this.state.resultStatus}</p>
                                                    <pre style={{ color: 'green', minHeight: 50 }}> {
                                                        JSON.stringify(this.state.result, null, 4)
                                                    }</pre>


                                                </Col>
                                            </Row>
                                            {/* {
                                                this.state.error ?
                                                    <p>{this.state.error}</p>
                                                    :
                                                    null
                                            } */}


                                        </Container>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}

export default TestLogin
