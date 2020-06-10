import React, { Component } from 'react';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/signInForm';


import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl

} from 'reactstrap';

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
                <PageHeader page='Sign in' {...this.props} />
                <div className="page-wrap">
                    <Container>
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
