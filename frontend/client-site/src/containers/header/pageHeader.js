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
            cartSize: 0,
            user: null
        };
        this.getNavOptions = this.getNavOptions.bind(this);
    }



    getNavOptions () {
        const role = localStorage.getItem('role');
        if(role){
            if(role == 'user'){
                return (<>
                <NavItem>
                    <Link to='/' className={this.props[0].location.pathname === '/'  ? 'active' : null}>Home Page</Link>
                </NavItem>
                <NavItem>
                    <Link to='/ads' className={this.props[0].location.pathname === '/ads'  ? 'active' : null}>Offers</Link>
                </NavItem>
                <NavItem>
                    <Link to='/cars/new' className={this.props[0].location.pathname === '/cars/new'  ? 'active' : null}>Create ad</Link>
                </NavItem>
                <NavItem>
                    <Link to='/requests' className={this.props[0].location.pathname === '/requests'  ? 'active' : null}>My Requests</Link>
                </NavItem>
                <NavItem>
                    <Link to='/orders' className={this.props[0].location.pathname === '/orders'  ? 'active' : null}>My Orders</Link>
                </NavItem>
                <NavItem>
                    <Link to='/cart' className={this.props[0].location.pathname === '/cart'  ? 'active' : null}>My Cart</Link>
                </NavItem>
                <NavItem>
                    <Link to='/' onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                    }}>Log out</Link>
                </NavItem>
                </>)
            }
            else{
                return (<>
                <NavItem>
                    <Link to='/' className={this.props[0].location.pathname === '/'  ? 'active' : null}>Home Page</Link>
                </NavItem>
                <NavItem>
                    <Link to='/ads' className={this.props[0].location.pathname === '/ads'  ? 'active' : null}>Offers</Link>
                </NavItem>
                <NavItem>
                    <Link to='/car-attributes/make' className={this.props[0].location.pathname === '/car-attributes/make'  ? 'active' : null}>Car attributes</Link>
                </NavItem>
                <NavItem>
                    <Link to='/registerAgent' className={this.props[0].location.pathname === '/registerAgent'  ? 'active' : null}>Register Agent</Link>
                </NavItem>
                <NavItem>
                    <Link to='/agents' className={this.props[0].location.pathname === '/agents'  ? 'active' : null}>Agents</Link>
                </NavItem>
                <NavItem>
                    <Link to='/' onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                    }}>Log out</Link>
                </NavItem>
                </>)
            }
        }
        else
        {
            return (<>
            <NavItem>
                <Link to='/' className={this.props[0].location.pathname === '/'  ? 'active' : null}>Home Page</Link>
            </NavItem>
            <NavItem>
                <Link to='/ads' className={this.props[0].location.pathname === '/ads'  ? 'active' : null}>Offers</Link>
            </NavItem>
            <NavItem>
                <Link to='/signin' className={this.props[0].location.pathname === '/signin'  ? 'active' : null}>Sign in</Link>
            </NavItem>
            <NavItem>
                <Link to='/signup' className={this.props[0].location.pathname === '/signup'  ? 'active' : null}>Sign up</Link>
            </NavItem></>)
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <Container>
                        <Row>
                            <Col lg={{ size: 4, offset: 2 }} xl={{ size: 3, offset: 0 }} xs={{ size: 4, offset: 2 }} sm={{ size: 4, offset: 2 }} className="logo">
                                <Link to='/'><Isvg src={logo} /></Link>
                            </Col>

                            <Col className="right hide-mobile" md={{ size: 8, offset: 0 }} xl={{ size: 9 }} >
                                <Row className="info">
                                </Row>
                                <Row className="navigation">
                                    <Nav>

                                        {this.getNavOptions()}
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
