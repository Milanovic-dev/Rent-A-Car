import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import AdminLoginPage from './views/admin/login';
import RegisterPage from './views/admin/register';

import ChangeCar from './views/admin/changeCar';
import Cars from './views/admin/cars';
import MileageReport from './views/admin/mileageReport';
import OrderPreview from './views/admin/orderPreview';

import MileageReports from './views/admin/mileageReports';

import CarStats from './views/admin/carStats';
import BusyCar from './views/admin/busyCar';



import ChangeMake from './views/admin/changeMake';
import Makes from './views/admin/makes';


import ChangeModel from './views/admin/changeModel';
import Models from './views/admin/models';


import ChangeFuel from './views/admin/changeFuel';
import Fuels from './views/admin/fuels';

import ChangeClass from './views/admin/changeClass';
import Classes from './views/admin/classes';

//  TEST 

import TestLogin from './views/admin/testLogin';
import Users from './views/admin/users';
import User from './views/admin/user';
import Test from './views/admin/test';
import Orders from './views/admin/carOrders';
import Bundles from './views/admin/carBundles';
import Pricelists from './views/admin/pricelists'
import ChangePricelist from './views/admin/changePricelist';
//


import Messages from './views/admin/messages';
import Map from './views/admin/map';



class Routes extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Router >
                <div>
                    <Switch className="react-switch">
                        <Route
                            path="/"
                            exact
                            render={(...renderProps) => (
                                <Cars {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/login"
                            exact
                            render={(...renderProps) => (
                                <AdminLoginPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/register"
                            exact
                            render={(...renderProps) => (
                                <RegisterPage {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/testLogin"
                            exact
                            render={(...renderProps) => (
                                <TestLogin {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/map/:id"
                            exact
                            render={(...renderProps) => (
                                <Map {...renderProps} {...this.props} />
                            )}
                        />


                        <Route
                            path="/cars"
                            exact
                            render={(...renderProps) => (
                                <Cars {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/cars/busy/:id"
                            exact
                            render={(...renderProps) => (
                                <BusyCar {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/messages"
                            exact
                            render={(...renderProps) => (
                                <Messages {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/users"
                            exact
                            render={(...renderProps) => (
                                <Users {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/users/:id"
                            exact
                            render={(...renderProps) => (
                                <User {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/makes"
                            exact
                            render={(...renderProps) => (
                                <Makes {...renderProps} {...this.props} />
                            )}
                        />


                        <Route
                            path="/makes/new"
                            exact
                            render={(...renderProps) => (
                                <ChangeMake {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/makes/:id"
                            exact
                            render={(...renderProps) => (
                                <ChangeMake {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/models"
                            exact
                            render={(...renderProps) => (
                                <Models {...renderProps} {...this.props} />
                            )}
                        />


                        <Route
                            path="/models/new"
                            exact
                            render={(...renderProps) => (
                                <ChangeModel {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/models/:id"
                            exact
                            render={(...renderProps) => (
                                <ChangeModel {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/fuels"
                            exact
                            render={(...renderProps) => (
                                <Fuels {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/fuels/new"
                            exact
                            render={(...renderProps) => (
                                <ChangeFuel {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/fuels/:id"
                            exact
                            render={(...renderProps) => (
                                <ChangeFuel {...renderProps} {...this.props} />
                            )}
                        />


                        <Route
                            path="/classes"
                            exact
                            render={(...renderProps) => (
                                <Classes {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/classes/new"
                            exact
                            render={(...renderProps) => (
                                <ChangeClass {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/classes/:id"
                            exact
                            render={(...renderProps) => (
                                <ChangeClass {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/cars/new"
                            exact
                            render={(...renderProps) => (
                                <ChangeCar {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/cars/:id"
                            exact
                            render={(...renderProps) => (
                                <ChangeCar {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/mileageReport/:id/:carId"
                            exact
                            render={(...renderProps) => (
                                <MileageReport {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/completedRentals"
                            exact
                            render={(...renderProps) => (
                                <MileageReports {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/order-preview/:id"
                            exact
                            render={(...renderProps) => (
                                <OrderPreview {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/carStats"
                            exact
                            render={(...renderProps) => (
                                <CarStats {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/test"
                            exact
                            render={(...renderProps) => (
                                <Test {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/carOrders"
                            exact
                            render={(...renderProps) => (
                                <Orders {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/carBundles"
                            exact
                            render={(...renderProps) => (
                                <Bundles {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/pricelists"
                            exact
                            render={(...renderProps) => (
                                <Pricelists {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/pricelist/new"
                            exact
                            render={(...renderProps) => (
                                <ChangePricelist {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/pricelist/:id"
                            exact
                            render={(...renderProps) => (
                                <ChangePricelist {...renderProps} {...this.props} />
                            )}
                        />
                    </Switch>
                </div>
            </Router >
        );
    }
}

export default Routes;