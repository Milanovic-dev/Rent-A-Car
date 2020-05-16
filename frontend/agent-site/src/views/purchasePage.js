import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';
import ReactPaginate from 'react-paginate';

import FilterForm from '../components/forms/filterForm';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import videoFile from '../assets/promo.mp4';

import Map from '../components/map';
import ankauf1 from '../assets/images/ankauf1.png';
import ankauf2 from '../assets/images/ankauf2.png';
import ankauf3 from '../assets/images/ankauf3.png';

import car from '../assets/images/car.png';
import truck from '../assets/images/truck.png';
import search from '../assets/images/ankauf-search.png';
import road from '../assets/images/road.png';
import parking from '../assets/images/parking.png';
import finish from '../assets/images/finish.png';

import emptyTruck from '../assets/images/empty-truck.png';

import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselControl,
    CarouselItem,

} from 'reactstrap';


class PurchasePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
    }
    componentWillMount() {
        document.title = 'Ankauf - SHOWROOM DAS AUTOHAUS'
    }


    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)

    }


    listenToScroll = () => {
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = this.animationRef.getBoundingClientRect(),
            offset = elemRect.top - bodyRect.top;

        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        this.setState({
            theposition: winScroll - offset,
        })
    }


    componentWillUnmount() {

    }


    render() {
        console.log(this.state.theposition);

        return (

            <div className={this.props.menu ? "solutions-wrap active-menu-animation" : "solutions-wrap"}>

                <PageHeader page='Ankauf' {...this.props} />
                <div className="page-wrap">

                    <section className="section solutions-section">
                        <Container >
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>ANKAUF</h2>
                                        <p></p>
                                    </div>
                                </Col>
                                <Col lg="12" className="promo-video">
                                    <video width="320" height="240" loop autoPlay="autoplay" controls>
                                        <source src={videoFile} type="video/mp4" />
                                        Your browser does not support the video tag.
</video>
                                </Col>


                            </Row>

                            <Row>
                                <Col md="12">
                                    <div className='au-trade-in-form-inline-auto'></div>
                                    <div className='au-trade-in-backlink' style={{ textAlign: 'right', fontSize: '12px', color: '#515c5e', fontFamily: 'sans-serif' }}>
                                        <span>Preisüberprüfung in Zusammenarbeit mit</span>
                                        <a href="https://www.autouncle.de/" target="_blank">
                                            <img style={{ height: '16px' }} src="https://www.autouncle.de/widgets/au_backlink_logo" alt="AutoUncle" />
                                        </a>
                                    </div>

                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="section">
                        <Container >
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>Bundesweiter Fahrzeugankauf- 
Verkaufen Sie Ihr Auto in nur 3 Schritten</h2>
                                        <p></p>
                                    </div>
                                </Col>
                                <Col lg="12" >
                                    <div className="road-animation-wrap" ref={(node) => this.animationRef = node}>

                                        {window.innerWidth > 1200 ?
                                            <>

                                                <img src={road} className="road" />

                                                <img src={emptyTruck} className="truck" style={
                                                    this.state.theposition >= 800 && this.state.theposition < 1700 ?
                                                        { top: `${200 + this.state.theposition}px` }
                                                        :
                                                        this.state.theposition > 1700
                                                            ?
                                                            { top: '1850px' }
                                                            : {}
                                                } />


                                                <img src={parking} className="parking" />

                                                {this.state.theposition >= 1690 && this.state.theposition < 2050 ?
                                                    <img src={car} className="car" style={

                                                        { top: `${2550}px` }


                                                    } />
                                                    :

                                                    <img src={car} className="car" style={
                                                        this.state.theposition > -300 && this.state.theposition < 2800 ?
                                                            {
                                                                marginTop:

                                                                    `${(this.state.theposition > 2000 ? 450 : 300) + this.state.theposition}px`
                                                            }
                                                            :
                                                            this.state.theposition >= 2800 ?
                                                                { top: `${450 + 2800}px` }
                                                                :
                                                                {}
                                                    } />

                                                }


                                                <img src={search} className="search" />
                                                <img src={finish} className="finish" />
                                            </>
                                            :

                                            <>

                                                <img src={road} className="road" />

                                                <img src={emptyTruck} className="truck" style={
                                                    this.state.theposition >= 700 && this.state.theposition < 1700 ?
                                                        { top: `${300 + this.state.theposition}px` }
                                                        :
                                                        this.state.theposition > 1700
                                                            ?
                                                            { top: '1850px' }
                                                            : {}
                                                } />


                                                <img src={parking} className="parking" />

                                                {this.state.theposition >= 1690 && this.state.theposition < 1750 ?
                                                    <img src={car} className="car" style={

                                                        { top: `${2100}px` }


                                                    } />
                                                    :

                                                    <img src={car} className="car" style={
                                                        this.state.theposition > -300 && this.state.theposition < 2294 ?
                                                            {
                                                                marginTop:

                                                                    `${(this.state.theposition > 1700 ? 280 : 300) + this.state.theposition}px`
                                                            }
                                                            :
                                                            this.state.theposition >= 2294 ?
                                                                { top: `${280 + 2330}px` }
                                                                :
                                                                {}
                                                    } />

                                                }


                                                <img src={search} className="search" />
                                                <img src={finish} className="finish" />
                                            </>
                                        }

                                        <div className="item item-1">
                                            <div className="number">1</div>
                                            <h3>Füllen Sie das Antragsformular mit den Daten Ihres Fahrzeuges aus.</h3>
                                            <img src={ankauf1} />
                                        </div>
                                        <div className="item item-2">
                                            <div className="number">2</div>
                                            <h3>Kostenlose Fahrzeugbewertung von unseren Experten vor Ort.</h3>
                                            <img src={ankauf3} />
                                        </div>
                                        <div className="item item-3">
                                            <div className="number">3</div>
                                            <h3>Noch am gleichen Tag nehmen wir Ihr Fahrzeug in Kauf</h3>
                                            <img src={ankauf2} />
                                        </div>
                                        <div className="block-item item-4">
                                            <div>
                                                <h3>Sie können sich bequem zurücklehnen und entspannen!</h3>
                                                <p>Wenn Sie unseren Autoankauf-Service in Anspruch nehmen, erledigen wir alles Weitere mithilfe von unserem vielfältigen Servicepaket für Sie. So können Sie sich viel und somit auch unnötigen Stress sparen.</p>
                                            </div>
                                        </div>
                                        <div className="block-item item-5">
                                            <div>
                                                <h3>Transparenter und fairer Kaufpreis</h3>
                                                <p>Mithilfe von einer kostenlosen Wertermittlung, prüfen wir die Funktionen Ihres Fahrzeuges.
Hierdurch können wir Ihnen einen transparenten und gleichzeitig fairen Ankaufspreis für Ihr Auto gewährleisten.</p>
                                            </div>
                                        </div>
                                        <div className="block-item item-6">
                                            <div>
                                                <h3>Schnell und Flexibel
</h3>
                                                <p>Ihr Neuwagen ist noch nicht ausgeliefert worden ? 
-Kein Problem !
Durch unseren Expressankauf- Service   
haben wir die Möglichkeit Ihr Fahrzeug schnell und flexibel abzuholen.
Sie teilen uns einfach mit, sobald Ihr Neuwagen geliefert ist und wir holen Ihr altes Fahrzeug zeitnah für Sie ab.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container></section>
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



export default connect(mapStateToProps)(PageWithLayout(PurchasePage));
