import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/login-bg.png';
import LoginForm from '../../components/forms/registerForm';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
        };
    }


    login(data) {

        fetch('https://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((result) => {
            if (!result.error) {
                //ocalStorage.setItem('token', result.token);
                this.setState({
                    _done: true
                })
            } else {
                this.setState({
                    error: result.error
                })
            }
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
                                    <Col lg="6" xs="12" className="login-bg">
                                        <img src={bg} />
                                    </Col>
                                    <Col lg="6" xs="12" className="login-form">
                                        <Container>
                                            <Row>
                                                <Col lg="12">
                                                    <h3>Registracija</h3>
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
                                            {
                                                this.state._done ?
                                                    <p>{this.state.error}</p>
                                                    :
                                                    null
                                            }

                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default LoginPage;