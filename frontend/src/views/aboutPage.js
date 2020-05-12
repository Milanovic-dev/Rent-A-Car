import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';

import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';

import Map from '../components/map';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';


import badge1 from '../assets/images/badge1.png';
import badge2 from '../assets/images/badge2.png';
import badge3 from '../assets/images/badge3.png';
import badge4 from '../assets/images/badge4.png';
import brand3 from '../assets/images/brand3.png';
import brand5 from '../assets/images/brand5.png';

import solutions_bg from '../assets/images/background1.png';
import calendar_icon from '../assets/svg/calendar.svg';
import engine_icon from '../assets/svg/engine.svg';
import car_icon from '../assets/svg/car-icon.svg';
import about from '../assets/images/about1.png';

class AboutPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0
        };
    }

    componentWillMount(){
        document.title = 'Über uns - SHOWROOM DAS AUTOHAUS'
    }

    render() {


        return (
            <div className={this.props.menu ? "about-wrap active-menu-animation" : "about-wrap"}>


                <PageHeader page='Über uns' {...this.props}/>
                <div className="page-wrap">

                    <section className="section about-section">
                        <Container >
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>{this.props.aboutus && this.props.aboutus.title}</h2>
                                        <p>{this.props.aboutus && this.props.aboutus.subtitle} </p>
                                    </div>
                                </Col>
                            </Row>

                            <Row>

                                <Col md="6" dangerouslySetInnerHTML={{__html: this.props.aboutus && this.props.aboutus.content && this.props.aboutus.content[0]}}>
                                   
                                </Col>
                                <Col md="6" dangerouslySetInnerHTML={{__html: this.props.aboutus && this.props.aboutus.content && this.props.aboutus.content[1]}}>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                                   {this.props.infoblock && this.props.infoblock.length == 4 ?
                    <section className="section services-section">

                        <Container>
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                    <h2>{this.props.config && this.props.config.infoBlockTitle}</h2>
                                    </div>
                                </Col>

                                <Col md="3" xs="6">
                                    <article>
                                        <img src={this.props.infoblock[0].image} />
                                        <h3>{this.props.infoblock[0].name}</h3>
                                    </article>
                                </Col>

                                <Col md="3" xs="6">
                                    <article>
                                        <img src={this.props.infoblock[1].image} />
                                        <h3>{this.props.infoblock[1].name}</h3>
                                    </article>
                                </Col>

                                <Col md="3" xs="6">
                                    <article>
                                        <img src={this.props.infoblock[2].image} />
                                        <h3>{this.props.infoblock[2].name}</h3>
                                    </article>
                                </Col>

                                <Col md="3" xs="6">
                                    <article>
                                        <img src={this.props.infoblock[3].image} />
                                        <h3>{this.props.infoblock[3].name}</h3>
                                    </article>
                                </Col>

                            </Row>
                        </Container>
                    </section>
                    :
                    null
                }



                {this.props.section && this.props.section[0] ?
                    <section className="section solutions-section">
                        <Container >
                            <div className="overlay">
                                <img src={this.props.section[0].image} className="overlay-image" />
                            </div>

                            <Row>
                                <Col lg="6">
                                    <article>
                                        <img src={this.props.section[0].image1} />

                                        <div>
                                            <h3>{this.props.section[0].title1}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: this.props.section[0].content1 }}></p>
                                        </div>
                                    </article>
                                </Col>
                                <Col lg="6">
                                    <article>
                                        <img src={this.props.section[0].image2} />

                                        <div>
                                            <h3>{this.props.section[0].title2}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: this.props.section[0].content1 }}></p>
                                        </div>
                                    </article>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    :
                    null
                }

                    <section className="section our-adventages-section">
                        <Container >
                            <Row>
                                <Col md="7" className="list">
                                    <h3>Our Advantages</h3>
                                    <ul>
                                        <li onClick={() => this.setState({active: 0})} className={this.state.active === 0 ? 'active' : ''}>
                                            <Isvg src={car_icon} ></Isvg><h6>Do you want to sell a car</h6>
                                            <p>What’s your car worth? Receive the absolute best value for your trade-in vehicle.
We even handle all paperwork. Schedule your appointment today!</p>
                                        </li>
                                        <li onClick={() => this.setState({active: 1})} className={this.state.active === 1 ? 'active' : ''}>
                                            <Isvg src={engine_icon} ></Isvg><h6>Are You looking for a new car?</h6>
                                            <p>What’s your car worth? Receive the absolute best value for your trade-in vehicle.
We even handle all paperwork. Schedule your appointment today!</p>
                                        </li>
                                        <li onClick={() => this.setState({active: 2})} className={this.state.active === 2 ? 'active' : ''}>
                                            <Isvg src={calendar_icon} ></Isvg><h6>How to schedule a service online?</h6>
                                            <p>What’s your car worth? Receive the absolute best value for your trade-in vehicle.
We even handle all paperwork. Schedule your appointment today!</p>
                                        </li>
                                    </ul>

                                </Col>
                                <Col md="5" className="image">
                                    <img src={about} />
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



export default connect(mapStateToProps)(PageWithLayout(AboutPage));
