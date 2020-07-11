import React from 'react';

import { GoogleMapScript } from '../../components/googleMapScript';
import moment from 'moment';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
        window.googleMapsCallback = this.googleMapsCallback;
        this.state = {};
    }

    googleMapsCallback = () => {
        this.setState({
            _googleMapsLoaded: true
        })
    }

    initMap() {
        if (typeof window == 'undefined') {
            return;
        }

        this.setState({
            _mapInit: true
        });
        var latLng = new window.google.maps.LatLng(45, 19
        );

        var map = new window.google.maps.Map(this.GoogleMap, {
            zoom: 16,
            center: latLng,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            gestureHandling: "gestureHandling",

        });

        fetch('https://localhost:8282/api/cars/get/' + this.props[0].match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                car: result
            })
        });


        fetch('https://localhost:8282/api/tracking/get/' + this.props[0].match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);

            for (let i = 0; i < result.length; i++) {
                var marker = new window.google.maps.Marker({
                    position: new window.google.maps.LatLng(result[i].coordinates[0], result[i].coordinates[1]),
                    map: map,
                });

                marker.addListener('click', () => {
                    //map.setCenter(marker.getPosition());
                    this.setState({
                        info: result[i]
                    })
                });


                map.setCenter(new window.google.maps.LatLng(result[i].coordinates[0], result[i].coordinates[1]))
            }

        })


        /*var marker = new window.google.maps.Marker({
            position: latLng,
            map: map,
        });

        let idx = 0;

        setInterval(() => {
            marker.setPosition(new window.google.maps.LatLng(points[idx].geometry.coordinates[1], points[idx].geometry.coordinates[0]
                ))
                idx++;
            }, 50)
*/


    }

    componentDidMount() {
        if (this.state._googleMapsLoaded && !this.state._mapInit) {
            this.initMap();
        }

    }

    componentDidUpdate() {
        if (this.state._googleMapsLoaded && !this.state._mapInit) {
            this.initMap();
        }
    }

    render() {
        return (
            <>
                <GoogleMapScript API_KEY="AIzaSyBqngKfEyxtSpLh58Vngc04gSE65an7hLA" />


                <div className="map" ref={(input) => { this.GoogleMap = input; }}>

                </div>
                {this.state.info ?
                    <div className="map-info">
                        <img src={this.state.car && this.state.car.images && this.state.car.images[0]} />
                        <h6>{this.state.car && this.state.car.make} {this.state.car && this.state.car.model}</h6>
                <p>{moment.unix(this.state.info.timestamp).format('MMMM DD. YYYY HH:mm:ss')}</p>
                    </div>
                    :
                    null

                }
            </>
        );
    }
}
