import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import moment from 'moment';
import Map from '../components/map';

import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl

} from 'reactstrap';
import CommentForm from '../components/forms/commentForm'

import Article from '../components/article';
import Comment from '../components/comment';
import account from '../assets/svg/account.svg';


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

        this.submitComment = this.submitComment.bind(this);
        this.get = this.get.bind(this);


        /*this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);*/

        this.state = {
            product: null,
            previewImage: null,
            modalIdx: null,
            products: [],
            activeIndex: 0,
            modalIdx: 0,
            newestProducts: [],
            reviews: []
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

    }

    componentDidMount() {
        this.get();

    }
    get() {
        fetch('https://localhost:8080/cars/get/' + this.props[0].match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                product: result,
                previewImage: result.images[0]
            })
        });

        fetch('https://localhost:8080/review/get/' + this.props[0].match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {

            this.setState({
                reviews: result,
            })
        });
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

    submitComment(data) {
        let date = new Date();
        data.date = Math.floor(date.getTime() / 1000);
        data.date = moment.unix(data.date).format('DD.MM.YYYY, HH:mm')
        data.carId = this.props[0].match.params.id;
        // data.userId = 'Aco';
        console.log(data);

        fetch(`https://localhost:8080/review/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then((res) => this.get())
    }


    render() {
        const { activeIndex } = this.state;

        let slides;

        if (this.state.product && this.state.product.images) {
            slides = this.state.product.images.map((item) => {
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

        }


        return (

            <div onMouseUp={this.onTouchEnd} className={this.props.menu ? "detail-wrap active-menu-animation" : "detail-wrap"}>

                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">

                    <section className="section detail-section">
                        <Container >
                            <Row>
                                <Col md="7">
                                    <img className="preview" onClick={() => { this.setState({ activeIndex: this.state.modalIdx, lightbox: true }) }} src={this.state.previewImage} />

                                    <div className="images" onMouseDown={this.onTouchStart} onMouseMove={this.onTouchMove} ref={(input) => { this.carousel = input; }}>


                                        {
                                            this.state.product && this.state.product.images && this.state.product.images.map((image, idx) => {
                                                return (

                                                    <div onClick={() => this.setState({ previewImage: image, modalIdx: idx })} className={this.state.previewImage == image ? "image active" : "image"}>
                                                        <img draggable="false" src={image} />
                                                    </div>


                                                )
                                            })
                                        }






                                    </div>
                                </Col>
                                <Col md="5">
                                    <div className="info">
                                        <h1>{this.state.product && this.state.product.make} {this.state.product && this.state.product.model}</h1>
                                        <div className="spacer"></div>
                                        <div className="price">
                                            <label>PRICE</label>
                                            <div>
                                                <p>{this.state.product && this.state.product.price}€</p>
                                            </div>
                                        </div>
                                        <div className="spacer"></div>
                                        <div className="price">
                                            <label>RATING</label>
                                            <div>
                                                <p style={{ color: "#fda919" }}>{this.state.product && this.state.product.rating}*</p>
                                            </div>

                                        </div>
                                        <div className="spacer"></div>
                                        <Row>
                                            {this.state.product ?
                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={calendar_icon} />
                                                    <div>
                                                        <label>Year</label>
                                                        <p>{this.state.product.productionYear}</p>
                                                    </div>
                                                </Col>

                                                : null
                                            }
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={guage_icon} className="guage" />
                                                    <div>
                                                        <label>Mileage</label>
                                                        <p>{this.state.product.mileage}</p>
                                                    </div>
                                                </Col>
                                                :
                                                null
                                            }
                                        </Row>
                                        <div className="spacer"></div>

                                        <Row>
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={fuel_icon} />
                                                    <div>
                                                        <label>Fuel</label>
                                                        <p>{this.state.product.fuel}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={color_icon} />
                                                    <div>
                                                        <label>Color</label>
                                                        <p>{this.state.product.color}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                        </Row>
                                        <div className="spacer"></div>
                                        <Row>
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={engine_icon} />
                                                    <div>
                                                        <label>Motorleistung (KW)</label>
                                                        <p>{this.state.product.power}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={door_icon} />
                                                    <div>
                                                        <label>Seat count</label>
                                                        <p>{this.state.product.seatCount}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                        </Row>
                                        <div className="spacer"></div>

                                        <Row>
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={transmission_icon} />
                                                    <div>
                                                        <label>Transmission</label>
                                                        <p>{this.state.product.transmission}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={car_icon} />
                                                    <div>
                                                        <label>Class</label>
                                                        <p>{this.state.product.class}</p>
                                                    </div>
                                                </Col>
                                                : null}

                                        </Row>
                                        <div className="spacer"></div>
                                        <Row>
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={transmission_icon} />
                                                    <div>
                                                        <label>Limit mileage</label>
                                                        <p>{this.state.product.limitMileage}</p>
                                                    </div>
                                                </Col>
                                                : null}
                                            {this.state.product ?

                                                <Col md="6" xs="6" className="attribute">
                                                    <Isvg src={car_icon} />
                                                    <div>
                                                        <label>Location</label>
                                                        <p>{this.state.product.location}</p>
                                                    </div>
                                                </Col>
                                                : null}

                                        </Row>

                                    </div>
                                </Col>


                                <Col md="12" className="extra-features">
                                    <h3>VEHICLE OVERVIEW</h3>

                                    <div >
                                        <Row>
                                            <Col md="12" >
                                                <p>Collision Damage Waiver Protection: {this.state.product && this.state.product.cdwp}</p><br />
                                                <p dangerouslySetInnerHTML={{ __html: this.state.product && this.state.product.description }}></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col md="12" className="extra-features">
                                    {
                                        this.state.product && this.state.product.commentAllow ?
                                            <div >
                                                <Row>
                                                    <Col md="12" >
                                                        <CommentForm onSubmit={this.submitComment} />
                                                    </Col>
                                                </Row>
                                            </div>
                                            : null
                                    }


                                </Col>
                                <Col md="12" >


                                    <div className="comments">
                                        <h3>COMMENTS</h3>
                                        <Row>
                                            <Col md="12" >
                                                {
                                                    this.state.reviews && this.state.reviews.map((comment) => {
                                                        if (comment.status == 2)
                                                            return (
                                                                <Col md="12">
                                                                    <Comment
                                                                        rate={comment.rate}
                                                                        id={comment._id}
                                                                        image={account}
                                                                        comment={comment.comment}
                                                                        userId={comment.userId}
                                                                        date={comment.date}
                                                                    />

                                                                </Col>
                                                            )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    </div>
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
