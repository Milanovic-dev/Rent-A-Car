import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Form from '../components/forms/registerForm'

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
        this.submit = this.submit.bind(this);
        this.state = {

        };
    }

    submit(data) {
        // console.log(data);
        fetch('https://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((result) => {
            if (!result.error) {
                //ocalStorage.setItem('token', result.token);
                this.setState({
                    _done: true
                })
            } else {
                this.setState({
                    error: result.error
                })
            }
        })
    }


    render() {




        return (

            <div >

                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">
                    <Container>
                    <Row>
                       
                        <Col lg="12" className="reg">
                            <Form onSubmit={this.submit} />
                            {
                                this.state.error ?
                                    <p>{this.state.error}</p>
                                    :
                                    null
                            }
                            {
                                this.state._done ?
                                    <p>{this.state.error}</p>
                                    :
                                    null
                            }

                        </Col>
        
                    </Row>
                    </Container>

                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(DetailPage));
