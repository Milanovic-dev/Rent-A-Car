import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {handleMobileSearchForm, handleMenu} from '../../actions/index';
import Isvg from 'react-inlinesvg';
import logo from '../../assets/svg/showroom.svg';
import slide1 from '../../assets/images/slide.png';
import {
    Container,
    Row,
    Col,
    Nav, NavItem,
    Carousel,
    CarouselItem,
} from 'reactstrap';

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
                                 </Col>
                                </Row>
                                <Row className="navigation">
                                    <Nav>
                                        <NavItem>
                                            <Link to='/' className={this.props[0].location.pathname === '/'  ? 'active' : null}>Home Page</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/ads' className={this.props[0].location.pathname === '/ads'  ? 'active' : null}>Ads</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/cars/new' className={this.props[0].location.pathname === '/cars/new'  ? 'active' : null}>Create ad</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/signin' className={this.props[0].location.pathname === '/signin'  ? 'active' : null}>Sign in</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/signup' className={this.props[0].location.pathname === '/signup'  ? 'active' : null}>Sign up</Link>
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
