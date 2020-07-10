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

const moment = require('moment');
const striptags = require('striptags');


class ChangeCar extends Component {

    constructor(props) {
        super(props);

        this.add = this.add.bind(this);



        this.state = {

        };
    }



    componentDidMount() {

        if (!localStorage.getItem('token')) this.props[0].history.push('/signin')

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

        fetch('https://localhost:8080/make/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                make: result
            })
        })
        fetch('https://localhost:8080/model/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                model: result
            })
        })
        fetch('https://localhost:8080/fuel/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                fuel: result
            })
        })
        fetch('https://localhost:8080/class/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                classes: result
            })
        })

    }






    add(data) {
        data.make ? data.make = striptags(data.make) : data.make = "";
        data.model ? data.model = striptags(data.model) : data.model = "";
        data.productionYear ? data.productionYear = striptags(data.productionYear) : data.productionYear = "";
        data.mileage ? data.mileage = striptags(data.mileage) : data.mileage = "";
        data.limitMileage ? data.limitMileage = striptags(data.limitMileage) : data.limitMileage = "";
        data.power ? data.power = striptags(data.power) : data.power = "";
        data.seatCount ? data.seatCount = striptags(data.seatCount) : data.seatCount = "";
        data.location ? data.location = striptags(data.location) : data.location = "";
        data.price ? data.price = striptags(data.price) : data.price = "";
        data.description ? data.description = striptags(data.description) : data.description = "";
        
        if (this.props[0].match.params.id) {
            fetch(`https://localhost:8080/cars/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push('/cars/' + this.props[0].match.params.id))


        } else {
            fetch(`https://localhost:8080/cars/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if (res.status == 201) {
                    this.props[0].history.push('/ads')
                }
                else if (res.status == 405) {
                    console.log('Cant create more than 3');
                }
            })
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
                                <Form initialValues={this.state.data} make={this.state.make} model={this.state.model} fuel={this.state.fuel} classes={this.state.classes} onSubmit={this.add} />
                                :
                                <Form onSubmit={this.add} make={this.state.make} model={this.state.model} fuel={this.state.fuel} classes={this.state.classes}/>

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
