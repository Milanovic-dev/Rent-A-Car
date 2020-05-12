import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';

import ContactForm from '../components/forms/contactForm';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';

import Map from '../components/map';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';




class ContactPage extends Component {
    constructor(props) {
        super(props);

        this.contact = this.contact.bind(this);

        this.state = {

        };
    }



    componentWillMount(){
        document.title = 'Kontakt - SHOWROOM DAS AUTOHAUS'
    }
    
    componentDidMount() {


    }




    
    contact(data) {

    }




    render() {

        return (

            <div className={this.props.menu ? "contact-wrap active-menu-animation" : "contact-wrap"}>

                <PageHeader page='Kontakt' {...this.props}/>
                <div className="page-wrap">

                    <section className="section contact-section">
                        <Container>
                            <Row>
                                <Col md="8">
                                    <ContactForm onSubmit={(data) => this.contact(data)}/>
                                    {
                                        this.state._done ?
                                            <p>Ihre Nachricht wurde gesendet</p>
                                        :

                                        null
                                    }
                                </Col>
                                <Col md="4">
                                    <div className="box">
                                        <h2>KONTAKTINFORMATION</h2>
                                        <p>Wir sind für Sie da,gerne und jederzeit.</p>
                                        <h6>Showroom</h6>
                                        <ul>
                                            <li><i className="mdi mdi-map-marker" /> <span>{this.props.config ? this.props.config.address : ''}</span></li>
                                            <li><i className="mdi mdi-phone" /> <span>{this.props.config ? this.props.config.phone : ''}</span></li>
                                            <li><i className="mdi mdi-email-outline" /> <span>{this.props.config ? this.props.config.email : ''}</span></li>

                                        </ul>
                                        <h2>ÖFFNUNGSZEITEN</h2>
                                        <h6>Montag - Freitag</h6>
                                        <p>{this.props.config && this.props.config.workingHours && this.props.config.workingHours[0]}</p>
                                        <h6>Samstag</h6>
                                        <p>{this.props.config && this.props.config.workingHours && this.props.config.workingHours[1]}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
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



            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(ContactPage));
