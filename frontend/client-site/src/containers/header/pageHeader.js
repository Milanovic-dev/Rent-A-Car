import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleMobileSearchForm, handleMenu } from '../../actions/index';
import Isvg from 'react-inlinesvg';
import logo from '../../assets/svg/showroom.svg';
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
                                </Row>
                                <Row className="navigation">
                                    <Nav>
                                    <NavItem>
                                            <Link to='/' className={this.props[0].location.pathname === '/'  ? 'active' : null}>Home Page</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/ads' className={this.props[0].location.pathname === '/ads'  ? 'active' : null}>Ads</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/cars/new' className={this.props[0].location.pathname === '/cars/new'  ? 'active' : null}>Create ad</Link>
                                        </NavItem>
                                        {!localStorage.getItem('token') ? 
                                        <><NavItem>
                                            <Link to='/signin' className={this.props[0].location.pathname === '/signin'  ? 'active' : null}>Sign in</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/signup' className={this.props[0].location.pathname === '/signup'  ? 'active' : null}>Sign up</Link>
                                        </NavItem></>
                                        : null}
                                        {localStorage.getItem('token') ? 
                                        <>
                                        <NavItem>
                                            <Link to='/cart' className={this.props[0].location.pathname === '/cart'  ? 'active' : null}>My cart</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to='/' onClick={() => {
                                                localStorage.removeItem('token');
                                            }}>Log out</Link>
                                        </NavItem>
                                        </>
                                        : null}
                                    </Nav>
                                </Row>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid className="sub-header">
                        <div className="overlay">
                            <img src={bg} alt="car" />
                        </div>
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
