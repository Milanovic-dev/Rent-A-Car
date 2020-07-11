import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import {
    Container,
    Row,
    Col,

} from 'reactstrap';
import logo from '../assets/svg/showroom.svg';
import fb_icon from '../assets/svg/facebook.svg';
import instagram_icon from '../assets/svg/instagram.svg';

export class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount()
    {
      var ref = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
      script.src = "//www.mobile.de/bewertungen/ratingwidget.js?dealerId=13841363";
      script.async = true;
  
      ref.parentNode.insertBefore(script, ref);
    }
    render() {
        return (
            <footer className="footer">
                <Container>

                    <Row>
                        <Col md="4">
                            <div className="logo">
                                <Isvg src={logo} />

                            </div>
                            <div className="description">
                                <p>{this.props.config && this.props.config.footerText}</p>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="nav">
                                <h6>NAVIGATION</h6>
                                <ul>
                                    <li><Link to='/'>Home page</Link></li>
                                    <li><Link to='/ads'>Ads</Link></li>
                                    <li><Link to="/cars/new">Create ad</Link></li>
                                    { !localStorage.getItem('token') ?
                                        <li><Link to='/signin'>Sign in</Link></li>
                                    : null
                                    }
                                    { !localStorage.getItem('token') ?
                                        <li><Link to='/signup'>Sign up</Link></li>
                                    : null
                                    }
                                </ul>
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="contact hide-mobile">
                                <i className="mdi mdi-map-marker" /> Find us on
                                <p>Karadjordjeva 8, Novi Sad, Serbia</p>
                            </div>
                        </Col>
                        <div className="spacer"></div>
                    </Row>
                </Container>

            </footer>
        )
    }
}

export default Footer;