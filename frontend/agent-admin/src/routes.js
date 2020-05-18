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
                            path="/cars"
                            exact
                            render={(...renderProps) => (
                                <Cars {...renderProps} {...this.props} />
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