import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';


import HomeHeader from '../containers/header/homeHeader';
import SearchForm from '../components/forms/searchForm';
import Map from '../components/map';
import Footer from '../containers/footer';
import Article from '../components/article';

import {
    Container,
    Row,
    Col,
    CarouselItem,
    Carousel,
    CarouselControl
} from 'reactstrap';




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




        fetch('http://127.0.0.1:8080/api/cars/v1/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                newestProducts: result
            })
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
                                                title={product.make + ' ' + product.model}
                                                id={product._id}
                                                image={ product.image}
                                                fuel={product.fuel}
                                                mileage={product.mileage}
                                                year={product.productionYear}
                                                price={product.price}
                                            />
                                        </Col>
                                    )
                                })
                            }

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



            </div >
        );
    }
}



const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(HomePage));
