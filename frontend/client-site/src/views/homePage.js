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
        this.searchProducts = this.searchProducts.bind(this);

        this.state = {
            newestProducts: [],
            productFilters: null
        };
    }


    componentWillMount() {
        document.title = "Rent-a-car";
    }

      
    componentDidMount() {
        fetch('https:/localhost:8080/search/getForm')
        .then(async (res) => {
            const data = await res.json();
            this.setState({
                productFilters: data
            })
        })
    }

    searchProducts(data) {

        console.log(data);
        fetch('https://localhost:8080/search/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                newestProducts: result
            })
        })

    }


    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    render() {

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
                        <Row>
                            {
                                this.state.newestProducts.map((product) => {
                                    return (
                                        <Col md="3" xs="6">
                                            <Article
                                                title={product.make + ' ' + product.model}
                                                id={product._id}
                                                images={product.images}
                                                fuel={product.fuel}
                                                mileage={product.mileage}
                                                year={product.productionYear}
                                                price={product.price}
                                                from={product.from}
                                                to={product.to}
                                                fromFormatted={product.fromFormatted}
                                                toFormatted={product.toFormatted}
                                                pricelist={product.pricelist}
                                            />
                                        </Col>
                                    )
                                })
                            }
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
