import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import menu from '../assets/svg/menu.svg';
import list from '../assets/svg/list.svg';
import add from '../assets/svg/add.svg';
import exit from '../assets/svg/exit.svg';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _show: true
        };
    }
    render() {
        return (
            <div className={this.state._show ? `sidebar` : 'sidebar sidebar-hidden'}>
                <div className="items">
                    <h6>Cars</h6>
                    <ul>
                        <li>
                            <Link to='/cars' className={this.props[0].location.pathname === '/cars' ? 'active' : null}>
                                <Isvg src={list} />
                                All cars
                            </Link>
                        </li>
                        <li>
                            <Link to='/cars/new' className={this.props[0].location.pathname === '/cars/new' ? 'active' : null}>
                                <Isvg src={add} />
                                Add new car
                            </Link>
                        </li>

                        <li>
                            <Link to='/completedRentals' className={this.props[0].location.pathname === '/completedRentals' ? 'active' : null}>
                                <Isvg src={list} />
                                Completed rentals
                            </Link>
                        </li>
                        <li>
                            <Link to='/carStats' className={this.props[0].location.pathname === '/carStats' ? 'active' : null}>
                                <Isvg src={list} />
                                Car stats
                            </Link>
                        </li>
                        <li>
                            <Link to='/carOrders' className={this.props[0].location.pathname === '/carOrders' ? 'active' : null}>
                                <Isvg src={list} />
                                Car Orders
                            </Link>
                        </li>
                    </ul>
                    {/*<h6>Manufacturers</h6>

                    <ul>
                        <li>
                            <Link to='/makes' className={this.props[0].location.pathname === '/makes' ? 'active' : null}>
                                <Isvg src={list} />
                                All manufacturers
                            </Link>
                        </li>
                        <li>
                            <Link to='/makes/new' className={this.props[0].location.pathname === '/makes/new' ? 'active' : null}>
                                <Isvg src={add} />
                                Add new manufacturer
                            </Link>
                        </li>
                    </ul>
                    <h6>Models</h6>

                    <ul>
                        <li>
                            <Link to='/models' className={this.props[0].location.pathname === '/models' ? 'active' : null}>
                                <Isvg src={list} />
            All models
        </Link>
                        </li>
                        <li>
                            <Link to='/models/new' className={this.props[0].location.pathname === '/models/new' ? 'active' : null}>
                                <Isvg src={add} />
            Add new model
        </Link>
                        </li>
                    </ul>
                    <h6>Fuel</h6>

                    <ul>
                        <li>
                            <Link to='/fuels' className={this.props[0].location.pathname === '/fuels' ? 'active' : null}>
                                <Isvg src={list} />
            All fuel types
        </Link>
                        </li>
                        <li>
                            <Link to='/fuels/new' className={this.props[0].location.pathname === '/fuels/new' ? 'active' : null}>
                                <Isvg src={add} />
            Add new fuel
        </Link>
                        </li>
                    </ul>
                    <h6>Car classes</h6>

                    <ul>
                        <li>
                            <Link to='/classes' className={this.props[0].location.pathname === '/classes' ? 'active' : null}>
                                <Isvg src={list} />
            All classes
        </Link>
                        </li>
                        <li>
                            <Link to='/classes/new' className={this.props[0].location.pathname === '/classes/new' ? 'active' : null}>
                                <Isvg src={add} />
            Add new class
        </Link>
                        </li>
                    </ul>


                    <ul>
                        <li>
                            <Link to='/users' className={this.props[0].location.pathname === '/users' ? 'active' : null}>
                                <Isvg src={list} />
                                All users
                            </Link>
                        </li>
                        <li>
                            <Link to='/test' className={this.props[0].location.pathname === '/test' ? 'active' : null}>
                                <Isvg src={list} />
                                Test form
                            </Link>
                        </li>
                    </ul>
                    */}

                    <ul className="logout">
                        <li id="logout" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('clinicAdminToken'); localStorage.removeItem('clinicUserToken'); localStorage.removeItem('patientToken'); }}>
                            <Link to='/login' id="logout-link" >
                                <Isvg src={exit} />
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menu" onClick={() => this.setState({ _show: !this.state._show })}>
                    <Isvg src={menu} />
                </div>
            </div >
        )
    }

};

export default Sidebar;