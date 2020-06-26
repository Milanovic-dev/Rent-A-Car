import React, { Component } from 'react';
import { PageWithLayout } from '../../containers/page';
import { connect } from 'react-redux';
import PageHeader from '../../containers/header/pageHeader';
import Footer from '../../containers/footer';
import Map from '../../components/map';
import Form from '../../components/forms/cartForm';

import {
    Container,
    Row,
    Col,
    CarouselItem,
} from 'reactstrap';


class Logs extends Component {
    constructor(props){
        super(props);
    }

    fetchLogs(service) {
        fetch(`https://localhost:8080/${service}/logs`, {
            method: 'GET', 
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            const body = await res.text();
            this.downloadTxtFile(service, body);
        })
    }

    downloadTxtFile = (service, data) => {
        const element = document.createElement("a");
        const file = new Blob([data], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${service}.log`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }

    render(){
        return (<>
            <PageHeader page="My Cart" {...this.props} />
                <div className="page-wrap">
                <Container>
                        <Row>
                            <Col lg="12" className="reg">
                            <form className="contact-form space-form" style={{width:1000, marginLeft: -150}}>
                                <h4>Logs</h4>
                                <div>
                                <a href='#' onClick={() => this.fetchLogs('cars')}>cars/logs</a>
                                </div>
                                <div>
                                <a href='#' onClick={() => this.fetchLogs('auth')}>auth/logs</a>
                                </div><div>
                                <a href='#' onClick={() => this.fetchLogs('orders')}>orders/logs</a>
                                </div>
                            </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer {...this.props} />
        </>)
    }
}

export default Logs;