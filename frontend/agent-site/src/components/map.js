import React from 'react';

import { GoogleMapScript } from './googleMapScript';

import pin from '../assets/images/pin.png';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
        this.state = {};
    }

    initMap() {
        if (typeof window == 'undefined'){
            return;
        }

        this.setState({
            _mapInit: true
        });
        var latLng = new window.google.maps.LatLng(this.props.settings.coords.split(',')[0], this.props.settings.coords.split(',')[1]
            );

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
            icon: pin
        });

    }

    componentDidMount() {
        if (this.props._googleMapsLoaded && !this.state._mapInit && this.props.settings) {
            this.initMap();
        }

    }

    componentDidUpdate() {
        if (this.props._googleMapsLoaded && !this.state._mapInit && this.props.settings) {
            this.initMap();
        }
    }

    render() {
        return (
            <>
                                <GoogleMapScript API_KEY="AIzaSyDx7uNRz2GYWKLlAlfT6wugFOSBXQ7EZaQ" />

                {
                    this.props._googleMapsLoaded ?
                        <div className="map" ref={(input) => { this.GoogleMap = input; }}>

                        </div>
                        : null
                }
            </>
        );
    }
}
