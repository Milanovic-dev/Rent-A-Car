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


import Form from '../components/forms/form';


import rightChevron from '../assets/svg/right-chevron.svg';
import bg from '../assets/images/bg.png';
import badge from '../assets/images/badge.png';

import welcome from '../assets/images/welcome.png';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);


        this.state = {

        };



    }




    componentDidMount() {

        if (typeof window !== 'undefined') { window.scrollTo(0, 0); }
        fetch('https://api.verkaufes24.de/home', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            this.setState({
                ...data
            })
        })


    }


    submit(data) {
        this.setState({
            formLoading: true
        }, () => {

            /*
            fetch('apiendpoint', {
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
            */
        })



        console.log(data);
    }

    render() {

        return (
            <div className="home-wrap">
                <div className="into-wrap">
                    <div className="background-image"><img src={bg} /></div>
                    <Container>
                        <Row>
                            <Col xl="6" md={{ size: 12, offset: 0 }} className="content">
                                <h6>{this.state.section1 && this.state.section1.subtitle}</h6>
                                <div className="title">
                                    <h1 dangerouslySetInnerHTML={{ __html: this.state.section1 && this.state.section1.title }}></h1>
                                    <img src={badge} />
                                </div>

                                <Form loading={this.state.formLoading} done={this.state.formDone} onSubmit={this.submit} />

                                <p>{this.state.section1 && this.state.section1.text && this.state.section1.text[0]}</p>

                            </Col>
                            <Col xl={{ size: 5, offset: 1 }} md={{ size: 12, offset: 0 }} className="right-content">
                                <div>
                                    <div className="item-1">
                                        <h6 dangerouslySetInnerHTML={{ __html: this.state.section1 && this.state.section1.text && this.state.section1.text[1] }}></h6>
                                    </div>
                                    <div className="item-2">
                                        <p dangerouslySetInnerHTML={{ __html: this.state.section1 && this.state.section1.text && this.state.section1.text[2] }}></p>
                                    </div>
                                </div>
                                <div className="item-3">
                                    <p dangerouslySetInnerHTML={{ __html: this.state.section1 && this.state.section1.text && this.state.section1.text[3] }}></p>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </div>
                <section className="info-section">
                    <Container>
                        <Row>
                            <Col lg="4" className="item item-1">
                                <div className="icon">1</div>
                                <div>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.section2 && this.state.section2.text && this.state.section2.text[0] }}></p>
                                </div>
                            </Col>
                            <Col lg="4" className="item item-2">
                                <div className="icon">2</div>
                                <div>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.section2 && this.state.section2.text && this.state.section2.text[1] }}></p>
                                </div>
                            </Col>

                            <Col lg="4" className="item item-3">
                                <div className="icon">3</div>
                                <div>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.section2 && this.state.section2.text && this.state.section2.text[2] }}></p>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </section>

                <section className="content-section">
                    <Container>
                        <Row>
                            <Col lg="6" className="left-anim">
                                <img src={welcome} />
                            </Col>
                            <Col lg={{ size: 5, offset: 1 }} className="right-anim">
                                <h6>{this.state.section3 && this.state.section3.subtitle}</h6>
                                <h2 dangerouslySetInnerHTML={{ __html: this.state.section3 && this.state.section3.title }}></h2>
                                <div dangerouslySetInnerHTML={{ __html: this.state.section3 && this.state.section3.content }}></div>

                                <Link to="/kontakt"><button className="button">KONTAKT <Isvg src={rightChevron} /></button></Link>

                            </Col>
                        </Row>
                    </Container>
                </section>

            </div>
        );
    }
}

export default Page(HomePage);