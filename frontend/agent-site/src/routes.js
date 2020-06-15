import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
     
} from 'react-router-dom';




import HomePage from './views/homePage';
import InventoryPage from './views/inventoryPage';
import DetailPage from './views/detailPage';
import ChangeCar from './views/changeCar';
import BusyCar from './views/busyCar';
import SignIn from './views/signInPage';
import Register from './views/register';
import Cart from './views/cart';
import DynamicPage from './views/dynamicPage';
import ContactPage from './views/contactPage';



class Routes extends Component {

    componentDidMount() {

    }

    render() {
        return (
                <div>


                    <Switch className="react-switch">
                        <Route
                            path="/"
                            exact
                            render={(...renderProps) => (
                                <HomePage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/page/:alias"
                            exact
                            render={(...renderProps) => (
                                <DynamicPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/kontakt"
                            exact
                            render={(...renderProps) => (
                                <ContactPage {...renderProps} {...this.props} />
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
                            path="/cars/edit/:id"
                            exact
                            render={(...renderProps) => (
                                <ChangeCar {...renderProps} {...this.props} />
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
                            path="/cars/:id"
                            exact
                            render={(...renderProps) => (
                                <DetailPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/signin"
                            exact
                            render={(...renderProps) => (
                                <SignIn {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/ads"
                            exact
                            render={(...renderProps) => (
                                <InventoryPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/signup"
                            exact
                            render={(...renderProps) => (
                                <Register {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/cart"
                            exact
                            render={(...renderProps) => (
                                <Cart {...renderProps} {...this.props} />
                            )}
                        />
                    </Switch>
                </div>
        );
    }
}

export default Routes;