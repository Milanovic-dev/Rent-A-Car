import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import star from '../assets/images/star.png';

export class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    initMap() {
        console.log("InitMAP");
        this.setState({
            _mapInit: true
        });
        var latLng = new window.google.maps.LatLng(this.props.config.coords.split(',')[0], this.props.config.coords.split(',')[1]);

        var map = new window.google.maps.Map(this.GoogleMap, {
            zoom: 16,
            center: latLng,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            gestureHandling: "gestureHandling",
        });


        var marker = new window.google.maps.Marker({
            position: latLng,
            map: map,
        });

        marker.addListener('click', () => {
            var win = window.open('https://www.google.com/maps/place/SHOWROOM+-+DAS+AUTOHAUS+-/@49.2467298,8.5323693,19z/data=!3m1!4b1!4m5!3m4!1s0x4797ba8ccdc38f75:0xc40b1426ff4e021b!8m2!3d49.2467298!4d8.5329165', '_blank');
            win.focus();
        });
        this.setState({ googleMap: map });
    }

    componentDidMount() {

        if (this.props._googleMapsLoaded && !this.state._mapInit && this.props.config) {
            this.initMap();
        }

    }

    componentDidUpdate(prevProps) {

        if (this.props._googleMapsLoaded && !this.state._mapInit && this.props.config) {
            this.initMap();
        }
    }


    render() {
        return (
            this.props._googleMapsLoaded ?
                <>
                    <div className="map" ref={(input) => { this.GoogleMap = input; }}>

                    </div>
                    <div className="footer-button-wrap">
                    <img src={star} />

                        <Container >
                            <Row>
                                <Col lg="8">
                                    <h3>Leave a rate and review!</h3>
                                    <p>We would like to hear your experience!</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
                : null
        )
    }
}

export default Map;