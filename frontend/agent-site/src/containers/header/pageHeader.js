import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleMobileSearchForm, handleMenu } from '../../actions/index';
import Isvg from 'react-inlinesvg';
import logo from '../../assets/svg/showroom.svg';
import fb_icon from '../../assets/svg/facebook.svg';
import instagram_icon from '../../assets/svg/instagram.svg';
import bg from '../../assets/images/hedarbg2.png';
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem
} from 'reactstrap';

class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {
        return (
            <div>
                <div className="header">
                    <Container>
                        <Row>
                            <Col xs="2" className="mobile-menu hide-desktop" onClick={() => this.props.handleMenu(!this.props.menu)}>
                                <i className="mdi mdi-menu" />
                            </Col>
                            <Col lg={{ size: 4, offset: 2 }} xl={{ size: 3, offset: 0 }} xs={{ size: 4, offset: 2 }} sm={{ size: 4, offset: 2 }} className="logo">
                                <Link to='/'><Isvg src={logo} /></Link>
                            </Col>

                            {this.props[0].location.pathname === '/' || this.props[0].location.pathname.indexOf('fahrzeuge') !== -1 ?
                                <Col xs={{ size: 2, offset: 2 }} className="mobile-menu hide-desktop" onClick={() => this.props.handleChange(!this.props.searchForm)}>
                                    <i className="mdi mdi-magnify" />
                                </Col>
                                : null
                            }
                            <Col className="right hide-mobile" md={{ size: 8, offset: 0 }} xl={{ size: 9 }} >
                                <Row className="info">
                                    <Col md="7">
                                        <i className="mdi mdi-map-marker"></i>{this.props.config ? this.props.config.address : ''}
                                    </Col>

                                    <Col md="3">
                                        <i className="mdi mdi-phone"></i>  {this.props.config ? this.props.config.phone : ''}

                                    </Col>


                                    <Col md="2">
                                        <a href={this.props.config && this.props.config.facebook} target="_blank" rel="noopener noreferrer"><Isvg src={fb_icon} /></a>
                                        <a href={this.props.config && this.props.config.instagram} target="_blank" rel="noopener noreferrer"><Isvg src={instagram_icon} /></a>

                                    </Col>
                                </Row>
                                <Row className="navigation">


                                    <Nav>
                                        <NavItem>
                                            <Link to='/' className={this.props[0].location.pathname === '/' ? 'active' : null}>Startseite</Link>
                                        </NavItem>
                                        {/*<NavItem>
                                            <Link to='/uber-uns' className={this.props[0].location.pathname == '/uber-uns'  ? 'active' : null}>Über uns</Link>
                                        </NavItem>*/}
                                        <NavItem>
                                            <Link to='/fahrzeuge' className={this.props[0].location.pathname === '/fahrzeuge' ? 'active' : null}>Fahrzeuge</Link>
                                        </NavItem>

                                    </Nav>
                                </Row>




                            </Col>

                        </Row>

                    </Container>

                    <Container fluid className="sub-header">
                        <div className="overlay">
                            <img src={bg} />
                        </div>
                        <Container>
                            <Row className="info">
                                <Col md="7">
                                    <h1 className="title">{this.props.page}</h1>
                                </Col>
                                <Col md="5">
                                    <ul className="breadcrumb">
                                        <li><a>Startseite</a></li>
                                        <li><a>{this.props.page}</a></li>
                                    </ul>
                                </Col>
                            </Row>

                        </Container>
                    </Container>



                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchForm: state.searchForm,
    menu: state.menu
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleChange: (val) => {
            dispatch(handleMobileSearchForm(val))
        },
        handleMenu: (val) => {
            dispatch(handleMenu(val))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
