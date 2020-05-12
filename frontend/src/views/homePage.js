import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';
import ScrollTrigger from 'react-scroll-trigger';

import Isvg from 'react-inlinesvg';


import HomeHeader from '../containers/header/homeHeader';
import SearchForm from '../components/forms/searchForm';
import ServiceForm from '../components/forms/serviceForm';
import Map from '../components/map';
import Footer from '../containers/footer';
import Article from '../components/article';
import Slider from "react-slick";

import {
    Container,
    Row,
    Col,
    CarouselItem,
    Carousel,
    CarouselControl
} from 'reactstrap';

import brand1 from '../assets/images/brand3.png';
import brand2 from '../assets/images/brand3.png';
import brand4 from '../assets/images/brand3.png';

import brand3 from '../assets/images/brand3.png';
import brand5 from '../assets/images/brand5.png';


import car_image1 from '../assets/images/car1.png';
import car_image2 from '../assets/images/car2.png';
import car_image3 from '../assets/images/car3.png';
import car_image4 from '../assets/images/car4.png';
import car_image5 from '../assets/images/car5.png';
import car_image6 from '../assets/images/car6.png';
import car_image7 from '../assets/images/car7.png';
import car_image8 from '../assets/images/car8.png';

import solutions_bg from '../assets/images/background1.png';

import gallery1 from '../assets/images/gallery1.png';
import gallery2 from '../assets/images/gallery2.png';
import gallery3 from '../assets/images/gallery3.png';
import gallery4 from '../assets/images/gallery4.png';
import gallery5 from '../assets/images/gallery5.png';
import gallery6 from '../assets/images/gallery6.png';
import gallery7 from '../assets/images/gallery7.png';
import gallery8 from '../assets/images/gallery8.png';
import gallery9 from '../assets/images/gallery9.png';
import gallery10 from '../assets/images/gallery10.png';


import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';


import badge1 from '../assets/images/badge1.png';
import badge2 from '../assets/images/badge2.png';
import badge3 from '../assets/images/badge3.png';
import badge4 from '../assets/images/badge4.png';

import videoFile from '../assets/promo.mp4';
import videoFile1 from '../assets/1.mp4';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.searchProducts = this.searchProducts.bind(this);

        this.state = {
            newestProducts: [],
            commingSoonProducts: [],
            productFilters: null,
            manufacturerModels: [],
            filters: {},
            gallery: [],
            activeIndex: 0,
            counter: 0
        };
    }


    componentWillMount() {
        document.title = "SHOWROOM DAS AUTOHAUS";
    }

      
    componentDidMount() {







        fetch('https://showroom-api.novamedia.agency/cars/latest').then((res) => res.json()).then((newestProducts) => {

             this.setState({ newestProducts }, () => {

            });
        })
        fetch('https://showroom-api.novamedia.agency/cars/filters').then((res) => res.json()).then((productFilters) => { console.log(productFilters); this.setState({ productFilters }); })

    }

    searchProducts(data) {
        console.log(data);
        if (data.year) {
            if (!data.year[0]) {
                data.year[0] = this.state.productFilters.minProductionYear;
            }
            if (!data.year[1]) {
                data.year[1] = this.state.productFilters.maxProductionYear;
            }
        }
        this.props[0].history.push(`/fahrzeuge/${encodeURIComponent(btoa(JSON.stringify(data)))}`)
    }


    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.gallery.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.gallery.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    componentWillUnmount() {

    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: window.innerWidth < 768 ? 3 : 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
              };

        const { activeIndex } = this.state;

        const slides = this.props.images && this.props.images.map((item) => {
            return (
                <CarouselItem
                    tag="div"
                    key={item}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <div className="lightbox-item">
                        <img src={item} />
                    </div>

                </CarouselItem>
            );
        });

        return (
            <div className={this.props.menu ? "home-wrap active-menu-animation" : "home-wrap"}>

                <HomeHeader {...this.props} />

                <div className="form-overlay hide-mobile"></div>

                {
                    this.state.productFilters ?
                        <SearchForm productFilters={this.state.productFilters} onSubmit={(val) => this.searchProducts(val)} />
                        : null
                }
                <section className="section latest-cars-section">
                    <Container>
                        <h3 className="section-title"><span>NEUESTE</span> AUTOS</h3>

                        <Row>

                            {
                                this.state.newestProducts.map((product) => {
                                    return (
                                        <Col md="3" xs="6">

                                            <Article
                                                title={product.title}
                                                alias={product.alias}
                                                id={product._id}
                                                image={'https://showroom-api.novamedia.agency/' + product.images[0]}
                                                fuel={product.attributes && product.attributes['fuel'] && product.attributes['fuel'].value}
                                                mileage={product.attributes && product.attributes['mileage'] && product.attributes['mileage'].value}
                                                year={product.attributes && product.attributes['firstRegistration'] && product.attributes['firstRegistration'].value}
                                                price={product.price && product.price.grs.localized}
                                            />
                                        </Col>
                                    )
                                })
                            }

                        </Row>

                    </Container>
                </section>

                {this.props.section && this.props.section[0] && this.state.newestProducts.length ?
        
                    <section className="section solutions-section" ref={(node) => this.solutionsRef = node}>
                                                    <ScrollTrigger  onEnter={() => {
                                    //alert(true)
                                    let timer = setInterval(() => {
                    
                                        if (this.state.counter >= 1) {
                                            this.setState({
                                                counter: 1
                                            })
                                            clearInterval(timer)
                                            return;
                                        }
                                        this.setState({
                                            counter: this.state.counter+0.1
                                        })
                            
                            
                                    }, 80);
                            
                        }} >         

                        <Container >
                            <div className="overlay">
                                <img src={this.props.section[0].image} className="overlay-image" />
                            </div>

                            <Row>
                                <Col xs="4" className="item">
                                    <h3>{Math.floor(this.state.counter * this.props.section[0].block1)} m2</h3>
                                    <p>Fläche</p>
                                </Col>
                                <Col xs="4" className="item">
                                    <h3>{Math.floor(this.state.counter * this.props.section[0].block2)}</h3>
                                    <p>Jahre Erfahrung</p>
                                </Col>

                                <Col xs="4" className="item">
                                    <h3>{Math.floor(this.state.counter * this.props.section[0].block3)}% </h3>
                                    <p>Kundenzufriedenheit</p>
                                </Col>

                                {/* <Col lg="6">
                                    <article>
                                        <img src={this.props.section[0].image2} />

                                        <div>
                                            <h3>{this.props.section[0].title2}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: this.props.section[0].content1 }}></p>
                                        </div>
                                    </article>
                </Col>*/}
                            </Row>
                        </Container>
                        </ScrollTrigger>

                    </section>

                    :
                    null
                }


                                <section className="section section-brands">
                    <Container>
                        <Row>
                        <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>UNSERE MARKENVIELFALT</h2>
                                    </div>
                                </Col>
                            <Col lg="12" className="slider-container">
                                <Slider {...settings}>
                                {
                                    this.props.brands && this.props.brands.map((item, idx) => {
                                        return (
                                            <div className="brand">
                                            <img src={item} />
                                    </div>

                                        )
                                    })
                                }


                                </Slider>

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
                                        {/* <p>{this.props.infoblock[0].content}</p>
                                        <Link to={this.props.infoblock[0].link} className="button"></Link>*/}
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

                {this.props.section ?
                    <section className="section solutions-section video-section">
                        <Container >
                            <div className="overlay">
                                <img src={this.props.section[0].image} className="overlay-image" />
                            </div>



                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>PROMO <span className="text-primary">VIDEO</span></h2>
                                    </div>
                                </Col>

                                <Col lg="6">
                                    <video width="320" height="240" loop autoPlay="autoplay" muted={true} controls>
                                        <source src={videoFile} type="video/mp4" />
                                        Your browser does not support the video tag.
</video>
                                </Col>
                                <Col lg="6">
                                    <video width="320" height="240" loop autoPlay="autoplay" muted={true} controls>
                                        <source src={videoFile1} type="video/mp4" />
                                        Your browser does not support the video tag.
</video>
                                </Col>

                            </Row>
                        </Container>
                    </section>
                    :
                    null
                }



                {/*<section className="section news-section">
                    <Container>
                        <div className="overlay">
                            <img src={solutions_bg} className="overlay-image" />
                        </div>

                        <Row>
                            <Col md="12">
                                <div className="sub-title text-center">
                                    <h2>UNSERE NEUESTEN <span className="text-primary">NACHRICHTEN</span></h2>
                                </div>

                            </Col>

                            <Col md="4">
                                <article>
                                    <img src={car_image1} />
                                    <div className="content">
                                        <div className="date">08. Novembar, 2018.</div>
                                        <h3 className="title">Lorem ipsum dolor sit amet</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur
corporis lab. Architecto, maiores, similique,
eos, ea doloribus nihil accusantium fuga.</p>
                                        <a className="read-more">Mehr info</a>
                                    </div>
                                </article>
                            </Col>

                            <Col md="4">
                                <article>
                                    <img src={car_image2} />
                                    <div className="content">
                                        <div className="date">08. Novembar, 2018.</div>
                                        <h3 className="title">Lorem ipsum dolor sit amet</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur
corporis lab. Architecto, maiores, similique,
eos, ea doloribus nihil accusantium fuga.</p>
                                        <a className="read-more">Mehr info</a>
                                    </div>
                                </article>
                            </Col>

                            <Col md="4">
                                <article>
                                    <img src={car_image3} />
                                    <div className="content">
                                        <div className="date">08. Novembar, 2018.</div>
                                        <h3 className="title">Lorem ipsum dolor sit amet</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur
corporis lab. Architecto, maiores, similique,
eos, ea doloribus nihil accusantium fuga.</p>
                                        <a className="read-more">Mehr info</a>
                                    </div>
                                </article>
                            </Col>
                        </Row>
                    </Container>
                </section>

        */}

                {/*  <ServiceForm onSubmit={(val) => console.log(val)} />*/}


                <section className="section gallery-section">
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <div className="sub-title text-center">
                                    <h2>UNSERE <span className="text-primary">GALERIE</span></h2>
                                </div>
                            </Col>


                            {
                                this.props.images && this.props.images.map((image, idx) => {
                                    return (
                                        <div key={idx} className="image" onClick={() => this.setState({ lightbox: true, activeIndex: idx })}>
                                            <img src={image} />
                                            <div className="hover">
                                                <div>
                                                    <div className="text">
                                                    </div>
                                                    <div className="magnify">
                                                        <i className="mdi mdi-magnify" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }


                        </Row>
                    </Container>



                </section>


                {this.state.lightbox ?
                    <div className="lightbox">
                        <i className="mdi mdi-close" onClick={() => this.setState({ lightbox: null })} />
                        <Carousel
                            activeIndex={activeIndex}
                            next={this.next}
                            previous={this.previous}
                            autoPlay={null}
                        >
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>

                    </div>
                    : null
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



            </div >
        );
    }
}



const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(HomePage));
