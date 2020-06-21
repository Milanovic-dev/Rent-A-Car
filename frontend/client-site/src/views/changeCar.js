import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';

import Map from '../components/map';
import Form from '../components/forms/carForm';


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


class ChangeCar extends Component {

    constructor(props) {
        super(props);
       
        this.add = this.add.bind(this);

  

        this.state = {
           
        };
    }

    

    componentDidMount() {

        if(!localStorage.getItem('token')) this.props[0].history.push('/signin')

        if (this.props[0].match.params.id) {
            fetch('https://localhost:8080/cars/get/' + this.props[0].match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then((res) => res.json()).then((result) => {
                this.setState({
                    data: result
                })
            });
        }

    }


    


    
    add(data){
        
        if (this.props[0].match.params.id){
            fetch(`https://localhost:8080/cars/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/cars/' + this.props[0].match.params.id))


        }else{
            fetch(`https://localhost:8080/cars/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/ads'))
        }
    }


    render() {
        

        return (

            <div className={this.props.menu ? "detail-wrap active-menu-animation" : "detail-wrap"}>

                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">


                    <Container>
                        <Row className="page-title">
                            <Col lg="12">
                            </Col>
                        </Row>
                        {
                            this.state.data ?
                                <Form initialValues={this.state.data} onSubmit={this.add} />
                                :
                                <Form onSubmit={this.add} />

                        }
                        {/* <Form onSubmit={this.add}/> */}
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



export default connect(mapStateToProps)(PageWithLayout(ChangeCar));
