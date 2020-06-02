import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';

import Map from '../components/map';
import Form from '../components/forms/busyCarForm';


import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl

} from 'reactstrap';
// import Article from '../components/article';


// import car_image6 from '../assets/images/car6.png';
// import car_image7 from '../assets/images/car7.png';
// import car_image8 from '../assets/images/car8.png';

// import fuel_icon from '../assets/svg/fuel.svg';
// import calendar_icon from '../assets/svg/calendar.svg';
// import guage_icon from '../assets/svg/guage.svg';
// import color_icon from '../assets/svg/color.svg';
// import engine_icon from '../assets/svg/engine.svg';
// import door_icon from '../assets/svg/car-door.svg';
// import transmission_icon from '../assets/svg/transmission.svg';
// import car_icon from '../assets/svg/car-icon.svg';


// import gallery1 from '../assets/images/gallery1.png';
// import gallery2 from '../assets/images/gallery2.png';
// import gallery3 from '../assets/images/gallery3.png';
// import gallery4 from '../assets/images/gallery4.png';
// import gallery5 from '../assets/images/gallery5.png';
// import gallery6 from '../assets/images/gallery6.png';
// import gallery7 from '../assets/images/gallery7.png';

// function generateAlias(str) {
//     /*str = str.toLowerCase();
//     str = str.replace(/\s\s+/g, ' ');
//     str = str.replace(/ /g, '-');
//     str = str.replace(/\./g, '-');
//     str = str.replace(/\,/g, '-');
//     str = str.replace(/š/g, 's');
//     str = str.replace(/č/g, 'c');
//     str = str.replace(/ć/g, 'c');
//     str = str.replace(/đ/g, 'dj');
//     str = str.replace(/ž/g, 'z');*/
//     str = str.replace(/[^a-zA-Z0-9]/gi, '-').toLowerCase()
//     return str;
// }


class BusyCar extends Component {

    constructor(props) {
        super(props);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.add = this.add.bind(this);

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

    }

    componentDidMount() {

        // fetch('http://localhost:8282/api/cars/v1/get/' + this.props[0].match.params.id, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     },
        // }).then((res) => res.json()).then((result) => {
        //     this.setState({
        //         product: result,
        //         previewImage: result.image
        //     })
        // });



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
    add(data){
        let ts1 = Math.floor(data.dateFrom.getTime() / 1000);
        let ts2 = Math.floor(data.dateTo.getTime() / 1000);

        // console.log(data);
        // console.log(ts1);
        // console.log(ts2);
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


                    <Container>
                        <Row className="page-title">
                            <Col lg="12">
                                <h3>ENTER OCCUPATION OF AN INDIVIDUAL CAR FOR A CERTAIN PERRIOD</h3>
                                <h7>SERIAL NUMBER: {this.props[0].match.params.id}</h7>
                            </Col>
                        </Row>
                        {/* {
                            this.state.data ?
                                <Form initialValues={this.state.data} onSubmit={this.add} />
                                :
                                <Form onSubmit={this.add} />

                        } */}
                        <Form  onSubmit={this.add}/>
                    </Container>


                    <section className="section map-section">
                        <Container fluid>

                            <Row>
                                <Col md="12">
                                    <Map {...this.props} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    {/* {slides && this.state.lightbox ?
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
                    } */}


                    <Footer {...this.props} />

                </div>



            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(BusyCar));
