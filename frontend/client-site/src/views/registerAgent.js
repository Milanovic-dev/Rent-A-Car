import React, { Component } from 'react';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/agentForm';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';


class RegisterAgent extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {done: false};

    }

    submit(data) {
    
        fetch('https://localhost:8080/webhook/agents/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.status == 201){
                this.setState({
                    done: true
                })
            }
        })
    }

    render() {

        return (
            <>
                <PageHeader page='Sign in' {...this.props} />
                <div className="page-wrap">
                    <Container>
                        <Row>
                            <Col lg="12" className="reg">
                                {
                                    this.state.done ? <div className="contact-form space-form">
                                        <h4 style={{color:'green',textAlign:'center', marginRight:'auto', marginLeft:'auto' }}>Successfully Registered Company!</h4>
                                        <p style={{textAlign:'center', marginRight:'auto', marginLeft:'auto' }}>Provide username and secret to the agent to be able to subscribe.</p>
                                    </div> : <Form  onSubmit={this.submit}/>
                                }
                            </Col>
                        </Row>
                    </Container>
                    <Footer {...this.props} />
                </div>
            </>
        );
    }
}


export default RegisterAgent;

