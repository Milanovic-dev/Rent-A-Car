import React, { Component } from 'react';
import Link from './link';
import Isvg from 'react-inlinesvg';

import logo from '../assets/svg/logo.svg';
import facebook from '../assets/svg/facebook.svg';
import instagram from '../assets/svg/instagram.svg';

import {
    Container,
    Row,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }




    render() {

        return (
            <footer>
                <Container>
                    <Row>
                        <Col lg="3" className="logo">
                            <Isvg src={logo} />
                            <div className="social">
                            <a href={this.props.settings && this.props.settings.facebook} target="_blank"><Isvg src={facebook} /></a>
                <a href={this.props.settings && this.props.settings.instagram} target="_blank"><Isvg src={instagram} /></a>

                            </div>
                        </Col>
                        <Col lg="5">
                            <h6>NAVIGATION</h6>
                            <ul>
                                <li><Link to='/'>Startseite</Link></li>
                                <li><Link to='/page/datenschutzerklärung'>Datenschutzerklärung</Link></li>
                                <li><Link to='/page/uber-uns'>Über uns</Link></li>
                                <li><Link to='/page/impressum'>Impressum</Link></li>
                                <li><Link to='/kontakt'>Kontakt</Link></li>
                                <li><Link to='/page/agb'>AGB</Link></li>

                            </ul>
                        </Col>
                        <Col lg="4">
                            <h6>BESUCHEN SIE UNS</h6>
                            <p dangerouslySetInnerHTML={{__html: this.props.settings && this.props.settings.address}}></p>

                                <p>{this.props.settings && this.props.settings.phone}</p>
                        </Col>
                        <Col lg="12">
                            <div className="spacer"></div>
                        </Col>
                        <Col lg="12" className="copyright">
                            <p>Copyright © Auto Bär 2020. All rights reserved.</p>
                            <p>Created by <a href="https://huge-media.de">huge media.</a></p>

                        </Col>

                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;