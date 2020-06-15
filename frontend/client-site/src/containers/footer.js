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

                            <div className="social">
                                <p>Folgen Sie uns
                                <a href={this.props.config && this.props.config.facebook} target="_blank" rel="noopener noreferrer" ><Isvg src={fb_icon} /></a>
                                    <a href={this.props.config && this.props.config.instagram} target="_blank" rel="noopener noreferrer" ><Isvg src={instagram_icon} /></a>
                                </p>
                            </div>
                                <div id="mobile-drw"></div>
                        </Col>

                        <Col md="4">
                            <div className="nav">
                                <h6>NAVIGATION</h6>
                                <ul>
                                    <li><Link to='/'>Home page</Link></li>
                                    <li><Link to='/'>Ads</Link></li>
                                    <li> <Link to='/fahrzeuge'>Agency</Link></li>
                                    <li><Link to='/service'>Service</Link></li>
                                    <li><Link to='/galerie'>Galery</Link></li>
                                </ul>
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="contact hide-mobile">
                                <i className="mdi mdi-map-marker" /> BESUCHEN SIE UNS
                                <p>{this.props.config ? this.props.config.address : ''}</p>
                            </div>
                            <h6>ÖFFNUNGSZEITEN</h6>
                            <h6>MO - FR</h6>
                            <p>{this.props.config && this.props.config.workingHours && this.props.config.workingHours[0]}</p>
                            <h6>SA</h6>
                            <p>{this.props.config && this.props.config.workingHours && this.props.config.workingHours[1]}</p>
                        </Col>
                        <div className="spacer"></div>
                    </Row>
                </Container>

            </footer>
        )
    }
}

export default Footer;