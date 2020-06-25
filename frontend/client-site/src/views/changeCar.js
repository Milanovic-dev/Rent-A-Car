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

const moment = require('moment')

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
            data.to = moment.unix(data.to).format("DD MMM hh:mm");
            data.from = moment.unix(data.from).format("DD MMM hh:mm");
            fetch(`https://localhost:8080/cars/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if(res.status == 201){
                    this.props[0].history.push('/ads')
                }
                else if(res.status == 405){
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
