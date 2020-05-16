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
    Carousel,
    CarouselItem,
    CarouselControl

} from 'reactstrap';
import Article from '../components/article';


import car_image6 from '../assets/images/car6.png';
import car_image7 from '../assets/images/car7.png';
import car_image8 from '../assets/images/car8.png';

import fuel_icon from '../assets/svg/fuel.svg';
import calendar_icon from '../assets/svg/calendar.svg';
import guage_icon from '../assets/svg/guage.svg';
import color_icon from '../assets/svg/color.svg';
import engine_icon from '../assets/svg/engine.svg';
import door_icon from '../assets/svg/car-door.svg';
import transmission_icon from '../assets/svg/transmission.svg';
import car_icon from '../assets/svg/car-icon.svg';


import gallery1 from '../assets/images/gallery1.png';
import gallery2 from '../assets/images/gallery2.png';
import gallery3 from '../assets/images/gallery3.png';
import gallery4 from '../assets/images/gallery4.png';
import gallery5 from '../assets/images/gallery5.png';
import gallery6 from '../assets/images/gallery6.png';
import gallery7 from '../assets/images/gallery7.png';

function generateAlias(str) {
    /*str = str.toLowerCase();
    str = str.replace(/\s\s+/g, ' ');
    str = str.replace(/ /g, '-');
    str = str.replace(/\./g, '-');
    str = str.replace(/\,/g, '-');
    str = str.replace(/š/g, 's');
    str = str.replace(/č/g, 'c');
    str = str.replace(/ć/g, 'c');
    str = str.replace(/đ/g, 'dj');
    str = str.replace(/ž/g, 'z');*/
    str = str.replace(/[^a-zA-Z0-9]/gi, '-').toLowerCase()
    return str;
}


class DetailPage extends Component {

    constructor(props) {
        super(props);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

        /*this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);*/

        this.state = {
            product: null,
            previewImage: null,
            modalIdx: null,
            products: [],
            activeIndex: 0,
            modalIdx: 0,
            newestProducts: []
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
        const nextIndex = this.state.activeIndex === this.state.product.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.product.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    componentWillMount() {

        document.title = this.props[0].match.params.alias.toUpperCase().replace(/-/g, ' ') + " - SHOWROOM";
    }

    componentDidMount() {

        fetch('https://showroom-api.novamedia.agency/cars/fetch/' + this.props[0].match.params.id).then((res) => res.json()).then((product) => {
            console.log(product);
            this.setState({ product, previewImage: (product.images && product.images[0]) });
        })

        fetch('https://showroom-api.novamedia.agency/cars/latest').then((res) => res.json()).then((newestProducts) => {
            this.setState({ newestProducts }, () => {
                

            });
        })



    }


    componentDidUpdate(prevProps) {
        if (prevProps[0].location.pathname != this.props[0].location.pathname) {
            fetch('https://showroom-api.novamedia.agency/cars/fetch/' + this.props[0].match.params.id).then((res) => res.json()).then((product) => {
                console.log(product);
                this.setState({ product, previewImage: (product.images && product.images[0]) });

            })

        }
    }

    componentWillUnmount() {

    }



    onTouchStart(event) {
        var x = event.clientX;
        var y = event.clientY;
        if (!this.state._startSwipePos) {
            this.setState({
                _startSwipePos: x,
                _startSwipePosY: y,
                _startLeft: this.carousel.scrollLeft
            });
        }
    }

    onTouchEnd() {
        this.setState({
            _startSwipePos: null,
            _startSwipePosY: null,
            _startLeft: null
        });
    }

    onTouchMove(event) {
        var x = event.clientX;
        var y = event.clientY;

        if (this.state._startSwipePos) {
            this.carousel.scrollLeft = this.state._startLeft - (x - this.state._startSwipePos);
        }

        this.setState({
            _swipePos: x
        });


    }


    render() {
        const { activeIndex } = this.state;

        let slides;

        if (this.state.product) {
            slides = this.state.product.images.map((item) => {
                return (
                    <CarouselItem
                        tag="div"
                        key={item}
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                    >
                        <div className="lightbox-item">
                            <img src={'https://showroom-api.novamedia.agency/' + item} />
                        </div>

                    </CarouselItem>
                );
            });

        }


        return (

            <div onMouseUp={this.onTouchEnd} className={this.props.menu ? "detail-wrap active-menu-animation" : "detail-wrap"}>

                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">

                    <section className="section detail-section">
                        <Container >
                            <Row>
                                <Col md="7">
                                    <img className="preview" onClick={() => { this.setState({ activeIndex: this.state.modalIdx, lightbox: true }) }} src={'https://showroom-api.novamedia.agency/' + this.state.previewImage} />

                                    <div className="images" onMouseDown={this.onTouchStart} onMouseMove={this.onTouchMove} ref={(input) => { this.carousel = input; }}>


                                        {
                                            this.state.product && this.state.product.images.map((image, idx) => {
                                                return (

                                                    <div onClick={() => this.setState({ previewImage: image, modalIdx: idx })} className={this.state.previewImage == image ? "image active" : "image"}>
                                                        <img draggable="false" src={'https://showroom-api.novamedia.agency/' + image} />
                                                    </div>


                                                )
                                            })
                                        }






                                    </div>
                                </Col>
                                <Col md="5">
                                    <div className="info">
                                        <h1>{this.state.product && this.state.product.title}</h1>
                                        <h6>{this.state.product && this.state.product.shortDescription}</h6>
                                        <div className="spacer"></div>
                                        <div className="price">
                                            <label>PRICE</label>
                                            <div>
                                                <p>{this.state.product && this.state.product.price && this.state.product.price.grs.localized}</p>
                                                <div className='au-widget-trade-in'></div>

                                            </div>
                                            {this.state.product && <div className="au-widget-car-rating" data-car-url={`https://showroom.gmbh/autos/${this.state.product.title}/${this.state.product._id}`} data-layout="wide_without_price_with_explanation" data-theme="transparent"></div>}
                                          
                                        </div>


                                        <div className="spacer"></div>
                                        <Row>
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['firstRegistration'] ?
                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={calendar_icon} />
                                                    <div>
                                                        <label>Erstzulassung</label>
                                                        <p>{this.state.product.attributes['firstRegistration'].value}</p>
                                                    </div>
                                                </Col>

                                                : null
                                            }
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['mileage'] ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={guage_icon} className="guage" />
                                                    <div>
                                                        <label>Kilometerstand</label>
                                                        <p>{this.state.product.attributes['mileage'].value}</p>
                                                    </div>
                                                </Col>
                                                :
                                                null
                                            }
                                        </Row>
                                        <div className="spacer"></div>

                                        <Row>
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['fuel'] ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={fuel_icon} />
                                                    <div>
                                                        <label>Motortyp</label>
                                                        <p>{this.state.product.attributes['fuel'].value}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['color'] ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={color_icon} />
                                                    <div>
                                                        <label>Farbe</label>
                                                        <p>{this.state.product.attributes['color'].value}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                        </Row>
                                        <div className="spacer"></div>
                                        <Row>
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['power'] ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={engine_icon} />
                                                    <div>
                                                        <label>Motorleistung (KW)</label>
                                                        <p>{this.state.product.attributes['power'].value}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['doorCount'] ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={door_icon} />
                                                    <div>
                                                        <label>Türen Anzahl</label>
                                                        <p>{this.state.product.attributes['doorCount'].value}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                        </Row>
                                        <div className="spacer"></div>

                                        <Row>
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['getriebe'] ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={transmission_icon} />
                                                    <div>
                                                        <label>Getriebe</label>
                                                        <p>{this.state.product.attributes['getriebe'].value}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                            {this.state.product && this.state.product.attributes && this.state.product.attributes['auto-typ'] ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={car_icon} />
                                                    <div>
                                                        <label>Auto Typ</label>
                                                        <p>{this.state.product.attributes['auto-typ'].value}</p>
                                                    </div>
                                                </Col>
                                                : null}

                                            <Col lg="12">
                                                <Link to='/finanzierung'><button className="button finance-button">zur Finanzierung</button></Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col md="12" className="extra-features">
                                    <h3>EXTRA FEATURES</h3>

                                    <div >



                                        <Row>

                                            {
                                                this.state.product && this.state.product && this.state.product.features.map((attribute) => {

                                                    return (

                                                        <Col md="3" xs="6" className="attr">
                                                            <div className="check"></div>
                                                            {attribute}
                                                        </Col>

                                                    )
                                                })


                                            }



                                        </Row>
                                    </div>

                                </Col>

                                <Col md="12" className="extra-features">
                                    <h3>VEHICLE OVERVIEW</h3>

                                    <div >
                                        <Row>
                                            <Col md="12" >
                                                <p dangerouslySetInnerHTML={{ __html: this.state.product && this.state.product.htmlDescription }}></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>


                                <Col md="12" className="latest-cars">
                                    <h3><span className="text-primary">NEUESTE</span> AUTOS</h3>

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
                    {slides && this.state.lightbox ?
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


                    <Footer {...this.props} />

                </div>



            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(DetailPage));
