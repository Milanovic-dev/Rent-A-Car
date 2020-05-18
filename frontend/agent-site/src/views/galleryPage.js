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
    CarouselControl,
    CarouselItem,

} from 'reactstrap';


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




class GalleryPage extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.registerSocketIOEvents = this.registerSocketIOEvents.bind(this);

        this.state = {
            activeIndex: 0,
            images: []
        };
    }


    componentWillMount(){
        document.title = 'Galerie - SHOWROOM DAS AUTOHAUS'
    }

    

    componentDidMount() {
        if (this.props.socketIOClient) {
            this.registerSocketIOEvents();
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.socketIOClient) {
            this.registerSocketIOEvents();
        }
    }

    registerSocketIOEvents() {
        if (this.state._registeredEvents)
            return;

        this.setState({
            _registeredEvents: true
        });


        this.props.socketIOClient.on('fetchGallery', (data) => {
            console.log(data);
            this.setState({
                images: data
            });
        });

        this.props.socketIOClient.emit('fetchGallery', {});
    }

    componentWillUnmount() {
        if (!this.props.socketIOClient) return;
        this.props.socketIOClient.removeAllListeners("fetchGallery");
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
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

        console.log()
        return (

            <div className={this.props.menu ? "gallery-wrap active-menu-animation" : "gallery-wrap"}>

                <PageHeader page='Galerie' {...this.props}/>
                <div className="page-wrap">

                    <section className="section gallery-section">
                        <Container >
                            <Row className="gallery">
                                {
                                    this.props.images && this.props.images.map((image, idx) => {
                                        return (
                                            <div key={idx} className="image" onClick={() => this.setState({lightbox: true, activeIndex: idx})}>
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

                    <section className="section map-section">
                        <Container fluid>

                            <Row>
                                <Col md="12">
                                    <Map {...this.props} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    { this.state.lightbox ?
                        <div className="lightbox">
                            <i className="mdi mdi-close" onClick={() => this.setState({lightbox: null})} />
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



export default connect(mapStateToProps)(PageWithLayout(GalleryPage));
