import React, { Component } from 'react';
import Link from './link';

import Isvg from 'react-inlinesvg';

/*header*/


import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';


import logo from '../assets/svg/logo.svg';
import facebook from '../assets/svg/facebook.svg';
import instagram from '../assets/svg/instagram.svg';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yScroll: 0
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined')
      window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined')
      window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const yScroll =
      document.body.scrollTop || document.documentElement.scrollTop


    this.setState({
      yScroll: yScroll,
      scrollHeader: yScroll < this.state.yScroll,
    })
  }



  render() {

    return (
      <header className={this.state.yScroll > 20 && this.state.scrollHeader ? 'scroll-header' : this.state.yScroll < 20 ? '' : 'hide-header'} >
        <Container>
          <Row>


            <Col lg="3" className="logo" xs="9" sm="9" md="9" >
              <Link lang={this.props.lang} to='/'> <Isvg src={logo} /> </Link>
            </Col>
            <Col xs="3" sm="3" className={this.state.mobileNavigation ? 'hamburger hamburger-animation' : 'hamburger'}>
              <button onClick={() => this.setState({ mobileNavigation: !this.state.mobileNavigation })}>
                <div></div>
                <div></div>
                <div></div>
              </button>
            </Col>


            <Col lg="9" className="desktop-nav">
              <ul className="navigation">
                <li> <Link to='/'>STARTSEITE</Link> </li>
                <li> <Link to='/page/uber-uns'>Über uns</Link> </li>
                <li> <Link to='/kontakt'>KONTAKT</Link> </li>

              </ul>
              <div className="social">
                <a href={this.props.settings && this.props.settings.facebook} target="_blank"><Isvg src={facebook} /></a>
                <a href={this.props.settings && this.props.settings.instagram} target="_blank"><Isvg src={instagram} /></a>

              </div>
            </Col>
          </Row>
        </Container>
        <div className={this.state.mobileNavigation ? 'mobile-navigation mobile-navigation-open' : 'mobile-navigation'}>
          <ul>
          <li> <Link to='/'>STARTSEITE</Link> </li>
                <li> <Link to='/page/uber-uns'>Über uns</Link> </li>
                <li> <Link to='/kontakt'>KONTAKT</Link> </li>

          </ul>

        </div>
      </header>
    );
  }
}

export default Header;