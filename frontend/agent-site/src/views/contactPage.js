import React, { Component } from 'react';
import Link from '../components/link';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';


import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    UncontrolledDropdown
} from 'reactstrap';



import Form from '../components/forms/contactForm';
import Map from '../components/map';

import bg from '../assets/images/page-bg.png';

class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

        this.state = {



        };
    }


    componentDidMount() {

        if (typeof window !== 'undefined') { window.scrollTo(0, 0); }

    }
    submit(data){
        this.setState({
            formLoading: true
        }, () => {

            fetch('https://api.verkaufes24.de/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
    
                },
                body: JSON.stringify(
                    data
                )
            }).then((res) => res.json()).then((result) => {
                this.setState({
                    formLoading: null,
                    formDone: true
                })
            })
        })



        console.log(data);
    }


    render() {

        return (
            <div className="page-wrap">
                <div className="into-wrap">
                    <div className="background-image"><img src={bg} /></div>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <h6>INTRODUCING THE</h6>
                                <h1>Kontakt</h1>
                            </Col>
                            <Col lg="6" className="bcrumb">
                                <ul>
                                    <li> <Link to='/'>STARTSEITE</Link> </li>
                                    <li> <Link to='/kontakt'>KONTAKT</Link> </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <section className="contact-section">
                    <Container>
                        <Row>
                            <Col lg="7">
                                <Form onSubmit={this.submit} loading={this.state.formLoading} done={this.state.formDone} />
                            </Col>
                            <Col lg={{ size: 5, offset: 0 }} xl={{size: 4, offset: 1}}>
                                <div className="contact-info">
                                    <h5>KONTAKTINFORMATION</h5>
                                    <p>Wir sind für Sie da,gerne und jederzeit.</p>
                                    <h6>Auto Bär</h6>
                                    <p dangerouslySetInnerHTML={{__html: this.props.settings && this.props.settings.address}}></p>
                                    <ul>
                                        <li>{this.props.settings && this.props.settings.phone}</li>
                                        <li>{this.props.settings && this.props.settings.email}</li>

                                    </ul>
                                    <h6>ÖFFNUNGSZEITEN</h6>
                                    <p><strong>Montag - Freitag</strong></p>
                                    <p>{this.props.settings && this.props.settings.wrokingTime && this.props.settings.wrokingTime[0]}</p>
                                    <p><strong>Samstag</strong></p>
                                    <p>{this.props.settings && this.props.settings.wrokingTime && this.props.settings.wrokingTime[1]}</p>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="map-section">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <Map {...this.props}/>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}

export default Page(ContactPage);