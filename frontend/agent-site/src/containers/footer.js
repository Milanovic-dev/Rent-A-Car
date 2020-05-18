import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
                                <a href={this.props.config && this.props.config.facebook} target="_blank"><Isvg src={fb_icon} /></a>
                                    <a href={this.props.config && this.props.config.instagram} target="_blank"><Isvg src={instagram_icon} /></a>
                                </p>
                            </div>

                                <div id="mobile-drw"></div>

                        </Col>

                        <Col md="4">
                            <div className="contact">
                                <i className="mdi mdi-phone" /> RUFEN SIE UNS AN 
                                    <p>{this.props.config ? this.props.config.phone : ''}</p>
                                <div className="hide-desktop">
                                    <i className="mdi mdi-map-marker" /> BESUCHEN SIE UNS
                                    <p>{this.props.config ? this.props.config.address : ''}</p>

                                </div>
                            </div>

                            <div className="nav">
                                <h6>NAVIGATION</h6>
                                <ul>

                                    <li><Link to='/'>Startseite</Link></li>
                                    {/*<li><Link to='/uber-uns'>Über uns</Link></li>*/}
                                    <li> <Link to='/fahrzeuge'>Fahrzeuge</Link></li>
                                    <li><Link to='/service'>Service</Link></li>
                                    <li><Link to='/galerie'>Galerie</Link></li>
                                    <li><Link to='/kontakt' >Kontakt</Link></li>
                                    <li><Link to='/seite/impressum' >Impressum</Link></li>
                                    <li><Link to='/seite/datenschutzerklarung' >Datenschutzerklärung</Link></li>
                                    <li><Link to='/seite/agb' >AGB</Link></li>

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

                        <div className="copyright">
                            <p>Copyright © Showroom Das Autohaus - 2019. All Rights Reserved.</p>
                           {/* <p>Created by <span><a href="https://www.huge-media.de">HUGE media</a></span></p>*/}
                        </div>

                    </Row>
                </Container>

            </footer>
        )
    }
}

export default Footer;