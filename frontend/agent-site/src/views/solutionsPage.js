import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';
import ReactPaginate from 'react-paginate';

import FilterForm from '../components/forms/filterForm';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';

import Map from '../components/map';

import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselControl,
    CarouselItem,

} from 'reactstrap';


import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';
import color_icon from '../assets/svg/color.svg';
import engine_icon from '../assets/svg/engine.svg';
import door_icon from '../assets/svg/car-door.svg';
import transmission_icon from '../assets/svg/transmission.svg';
import car_icon from '../assets/svg/car-icon.svg';

import solution1 from '../assets/images/solution1.png';
import solution2 from '../assets/images/solution2.png';
import solution3 from '../assets/images/solution3.png';
import gallery1 from '../assets/images/gallery1.png';
import ContactForm from '../components/forms/contactForm';

const items = [
    {
        id: 1,
        text: '"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum."',
    },
    {
        id: 2,
        text: '"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum."',
    },
    {
        id: 3,
        text: '"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum."',
    }
];


class SolutionsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.contact = this.contact.bind(this);
        
        this.state = {
            activeIndex: 0,
            date: new Date()
        };
    }


    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }


    componentDidMount(){
        fetch('https://showroom-api.novamedia.agency/services').then((res) => res.json()).then((services) => { console.log(services); this.setState({ services }); })

    }
    componentWillMount(){
        document.title = 'Service - SHOWROOM DAS AUTOHAUS'
    }

    contact(data) {
        data.service = true;

    }


    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    tag="div"
                    key={item.id}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <Col md={{ size: 10, offset: 1 }}>
                        <p className="slide-content">{item.text}</p>
                    </Col>

                </CarouselItem>
            );
        });


        return (

            <div className={this.props.menu ? "solutions-wrap active-menu-animation" : "solutions-wrap"}>

                <PageHeader page={this.props.config && this.props.config.serviceTitle} {...this.props}/>
                <div className="page-wrap">

                    <section className="section solutions-section">
                        <Container >
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>{this.props.config && this.props.config.serviceTitle}</h2>
                                        <p>{this.props.config && this.props.config.serviceSubtitle}</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="12" className="section-title-content">
                                <h6>Werkstatt</h6>

                                <p>Unsere KFZ-Profis übernehmen Reparaturen für alle Fabrikante. Mit langjähriger Erfahrung und modernster Technik sorgen wir für beste Ergebnisse!</p>
                                </Col>
                                {
                                    this.state.services && this.state.services.map((item, idx) => {
                                        if (item.category == 0)
                                        return (
                                            <Col md="4">
                                            <article>
                                                <div>
                                                    <h3>{item.name} <span>{item.name1}</span></h3>
                                                    <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                                                    
                                                </div>
                                                <img src={item.image} />
                                            </article>
                                        </Col>
        
                                        )
                                    })
                                }
                            </Row>
                            <Row>
                            <Col lg="12" className="section-title-content">
                                <h6>Fahrzeugaufbereitung</h6>
                                <p>Mit unserem zuverlässigen Service, einer professionellen Arbeitsweise und mit viel Liebe zum Detail sorgen wir dafür, dass Ihr Fahrzeug wieder aussieht wie neu.</p>
                                </Col>
                                {
                                    this.state.services && this.state.services.map((item, idx) => {
                                        if (item.category == 1)
                                        return (
                                            <Col md="4">
                                            <article>
                                                <div>
                                                    <h3>{item.name} <span>{item.name1}</span></h3>
                                                    <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                                                    
                                                </div>
                                                <img src={item.image} />
                                            </article>
                                        </Col>
        
                                        )
                                    })
                                }
                            </Row>

                            <Row>
                            <Col lg="12" className="section-title-content">
                                <h6>Smart Repair</h6>
                                <p>Mit unserer Lackreparatur verschwinden diese unschönen Schäden ganz schnell und Ihr Auto sieht wieder wie neu aus.</p>
                                </Col>
                                {
                                    this.state.services && this.state.services.map((item, idx) => {
                                        if (item.category == 2)
                                        return (
                                            <Col md="4">
                                            <article>
                                                <div>
                                                    <h3>{item.name} <span>{item.name1}</span></h3>
                                                    <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                                                    
                                                </div>
                                                <img src={item.image} />
                                            </article>
                                        </Col>
        
                                        )
                                    })
                                }
                            </Row>

                        </Container>
                    </section>

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

{/*
                    <section className="section achivments-section">
                        <Container >
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>SOLUTIONS WE PROVIDE</h2>
                                        <p>Nam non nisl. Phasellus commodo libero ac massa. </p>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="items">
                                <Col md="3">
                                    <Isvg src={car_icon} />
                                    <div className="text">
                                        <span>242.438</span>
                                        <span>CARS IN GARAGE</span>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <Isvg src={calendar_icon} />
                                    <div className="text">
                                        <span>242.438</span>
                                        <span>CARS SOLD</span>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <Isvg src={engine_icon} />
                                    <div className="text">
                                        <span>242.438</span>
                                        <span>CARS SERVICED</span>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <Isvg src={guage_icon} />
                                    <div className="text">
                                        <span>242.438</span>
                                        <span>TOTAL KILOMETER</span>
                                    </div>
                                </Col>

                            </Row>
                        </Container>
</section>*/}

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


{/*
                    <section className="section reviews-section">
                        <Container>

                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>WHAT THEY SAY ABOUT US</h2>
                                        <p>Latest testimonials</p>
                                    </div>

                                </Col>

                                <Carousel
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}
                                    autoPlay={false}
                                >
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                </Carousel>

                                <Col md={{ offset: 4, size: 1 }} className="prev-review">
                                    <img src={gallery1} />
                                </Col>

                                <Col md={{ size: 2 }} className="curr-review">
                                    <img src={gallery1} />
                                    <div className="name">Mariana Garcia</div>
                                    <div className="type">Satisfied Buyer</div>
                                </Col>
                                <Col md={{ size: 1 }} className="next-review">
                                    <img src={gallery1} />
                                </Col>


                            </Row>
                        </Container>
                    </section>
*/}
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



export default connect(mapStateToProps)(PageWithLayout(SolutionsPage));
