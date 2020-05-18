import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {handleMobileSearchForm, handleMenu} from '../../actions/index';

import Isvg from 'react-inlinesvg';

import logo from '../../assets/svg/showroom.svg';
import header_overlay from '../../assets/svg/header-overlay.svg';
import clock from '../../assets/svg/clock.svg';
import slide1 from '../../assets/images/slide.png';
import slide_promo from '../../assets/images/slide-promo.png';

import car_animation from '../../assets/images/car-animation.png';

import fb_icon from '../../assets/svg/facebook.svg';
import instagram_icon from '../../assets/svg/instagram.svg';


import {
    Container,
    Row,
    Col,
    Navbar,
    NavbarBrand,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Nav, NavItem,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption

} from 'reactstrap';
import { changeLanguage } from '../../actions';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        this.state = {
            activeIndex: 0,
            slides: [],
            thirdRowWidth: null
        };
    }

    next() {

    }

    previous() {

    }


    componentDidMount() {

        fetch('https://showroom-api.novamedia.agency/slides').then((res) => res.json()).then((slides) => { console.log(slides); this.setState({ slides }, () => {

        }); })

    }

    componentDidUpdate() {
       /* if (this.state.thirdRowWidth != this.secondRow.clientWidth)
            this.setState({ thirdRowWidth: this.secondRow.clientWidth });*/
    }

    render() {

        const items = [
            {
                src: slide1,
                altText: 'Slide 1',
                caption: 'Slide 1'
            },
            {
                src: slide1,
                altText: 'Slide 1',
                caption: 'Slide 1'
            }, {
                src: slide1,
                altText: 'Slide 1',
                caption: 'Slide 1'
            },
        ];


        const { activeIndex } = this.state;

        const slides = this.state.slides.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.image}
                >
                    <img src={item.imagebg} alt={item.name} />
                    <div className="slide-content">
                        <Container>
                            <Row>
                                <Col md="12">
                                    <h3 className="top-bottom-animation">{item.name}</h3>
                                    <h3 className="top-bottom-animation" ref={(input) => { this.secondRow = input; }}>{item.name1}</h3>
                                    <h3 className="top-bottom-animation"  ref={(input) => { this.thirdRow = input; }}>{item.name2}</h3>
                                    <img className="bubble bubble-animation" src={item.imageBadge} />
                                    <img className="image car-animation" src={item.image} />

                                </Col>

                            </Row>
                        </Container>
                    </div>
                </CarouselItem>
            );
        });
      //  console.log(this.props[0].location.pathname);

        return (
            <div>



                <div className="header">
                    <Container>
                        <Row>
                            <Col xs="2" className="mobile-menu hide-desktop" onClick={() => this.props.handleMenu(!this.props.menu)}>
                                <i className="mdi mdi-menu" />
                            </Col>
                            <Col lg={{size: 4, offset: 2}} xl={{size: 3, offset: 0}}  xs={{size: 4, offset: 2}} sm={{size: 4, offset: 2}} className="logo">
                                <Link to='/'><Isvg src={logo} /></Link>
                            </Col>
                            <Col xs={{size: 2, offset: 2}}  className="mobile-menu hide-desktop" onClick={() => this.props.handleChange(!this.props.searchForm)}>
                                <i className="mdi mdi-magnify" />
                            </Col>

                            <Col className="right hide-mobile" md={{ size: 8, offset: 0 }} xl={{size: 9}} >
                                <Row className="info">
                                    <Col md="7">
                                        <i className="mdi mdi-map-marker"></i>{this.props.config ? this.props.config.address : ''}
                                </Col>

                                    <Col md="3">
                                    <i className="mdi mdi-phone"></i>  {this.props.config ? this.props.config.phone : ''}
    
                                </Col>


                                    <Col md="2">
                                    <a href={this.props.config && this.props.config.facebook} target="_blank"><Isvg src={fb_icon} /></a>
                                    <a href={this.props.config && this.props.config.instagram} target="_blank"><Isvg src={instagram_icon} /></a>

                                    </Col>
                                </Row>
                                <Row className="navigation">

                                    <Nav>
                                        <NavItem>
                                            <Link to='/' className={this.props[0].location.pathname == '/'  ? 'active' : null}>Startseite</Link>
                                        </NavItem>
                                       {/* <NavItem>
                                            <Link to='/uber-uns' className={this.props[0].location.pathname == '/uber-uns'  ? 'active' : null}>Über uns</Link>
                                       </NavItem>*/}
                                        <NavItem>
                                            <Link to='/fahrzeuge' className={this.props[0].location.pathname == '/fahrzeuge'  ? 'active' : null}>Fahrzeuge</Link>
                                        </NavItem>

                                        <NavItem>
                                            <Link to='/ankauf' className={this.props[0].location.pathname == '/ankauf'  ? 'active' : null}>Ankauf</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/finanzierung' className={this.props[0].location.pathname == '/finanzierung' ? 'active' : null}>Finanzierung</Link>
                                        </NavItem>


                                        <NavItem>
                                            <Link to='/service' className={this.props[0].location.pathname == '/service'  ? 'active' : null}>Service</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/galerie' className={this.props[0].location.pathname == '/galerie'  ? 'active' : null}>Galerie</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/seite/karriere' className={this.props[0].location.pathname == '/seite/karriere'  ? 'active' : null}>Karriere</Link>
                                        </NavItem>

                                        <NavItem>
                                            <Link to='/kontakt' className={this.props[0].location.pathname == '/kontakt'  ? 'active' : null}>Kontakt</Link>
                                        </NavItem>
                                    </Nav>
                                </Row>




                            </Col>

                        </Row>


                    </Container>

                </div>

                <Carousel
                    className="home-slider"
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    {
                        /*
                    <div className="carousel-dots">
                        <Container>
                            <Row>
                                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                            </Row>
                        </Container>
                    </div>
                    */}
                    {slides}

                    

                </Carousel>




            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchForm: state.searchForm,
    menu: state.menu
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleChange: (val) => {
            dispatch(handleMobileSearchForm(val))
        },
        handleMenu: (val) => {
            dispatch(handleMenu(val))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
