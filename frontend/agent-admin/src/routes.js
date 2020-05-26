import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import AdminLoginPage from './views/admin/login';
import ChangeCar from './views/admin/changeCar';
import Cars from './views/admin/cars';
import MileageReport from './views/admin/mileageReport';
import CarStats from './views/admin/carStats';
import TestLogin from './views/admin/testLogin';
import Users from './views/admin/users';
import User from './views/admin/user';




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
                                <AdminLoginPage {...renderProps} {...this.props} />
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
                            path="/testLogin"
                            exact
                            render={(...renderProps) => (
                                <TestLogin {...renderProps} {...this.props} />
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
                            path="/mileageReport"
                            exact
                            render={(...renderProps) => (
                                <MileageReport {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/carStats"
                            exact
                            render={(...renderProps) => (
                                <CarStats {...renderProps} {...this.props} />
                            )}
                        />
                        
                        
                    </Switch>
                </div>
            </Router >
        );
    }
}

export default Routes;