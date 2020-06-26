import React, { Component } from 'react';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/resetPasswordForm'
import {
    Container,
    Row,
    Col,
    CarouselItem,
} from 'reactstrap';

const striptags = require('striptags');


class SignInPage extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {};

    }

    submit(data) {
        data.username ? data.username = striptags(data.username) : data.username = "";
        data.password ? data.password = striptags(data.password) : data.password = "";
        
        fetch('https://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((result) => {
            if (!result.error) {
                localStorage.setItem('token', result.token);
                this.setState({
                    _done: true
                })
                this.props[0].history.push('/ads');
            } else {
                this.setState({
                    error: result.error
                })
            }
        })
    }

    render() {
        const { activeIndex } = this.state;

        let slides;

        if (this.state.product && this.state.product.images) {
            slides = this.state.product.images.map((item) => {
                return (
                    <CarouselItem
                        tag="div"
                        key={item}
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                    >
                        <div className="lightbox-item">
                            <img src={'https://showroom-api.novamedia.agency/' + item} />
                        </div>

                    </CarouselItem>
                );
            });
        }

        return (
            <>
                <PageHeader page='Sign in' {...this.props} />
                <div className="page-wrap">
                    <Container>
                        <Row>
                            <Col lg="12" className="reg">
                                <Form  onSubmit={this.submit}/>
                            </Col>
                        </Row>
                    </Container>
                    <section className="section map-section">
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Map {...this.props} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <Footer {...this.props} />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});


export default connect(mapStateToProps)(PageWithLayout(SignInPage));
