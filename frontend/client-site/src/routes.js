import React, { Component } from 'react';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleMobileSearchForm, handleMenu } from './actions/index';

import { createBrowserHistory } from 'history';
import { GoogleMapScript } from './components/googleMapScript';

import HomePage from './views/homePage';
import InventoryPage from './views/inventoryPage';
import DetailPage from './views/detailPage';
import ChangeCar from './views/changeCar';
import BusyCar from './views/busyCar';
import SignIn from './views/signInPage';
import Register from './views/register';
import Cart from './views/cart';
import Orders from './views/orders';
import Requests from './views/requests'

import Comments from './views/admin/comments';
import Messages from './views/messages';
import Makes from './views/admin/makes';
import Users from './views/admin/users';



const history = createBrowserHistory();

class Routes extends Component {

    componentDidMount() {
        const unlisten = history.listen((location, action) => {
            //this.props.handleMenu(null);
            this.props.handleMenu(null);
            this.props.handleChange(null);
            window.scrollTo(0, 0);
        });
    }

    render() {
        return (
            <Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
                <div>
                    <GoogleMapScript API_KEY="" />
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={(...renderProps) => (
                                <HomePage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/fahrzeuge"
                            exact
                            render={(...renderProps) => (
                                <InventoryPage {...renderProps} {...this.props} />
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
                            path="/car-attributes/:type"
                            exact
                            render={(...renderProps) => (
                                <Makes {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/car-attributes/:type/:id"
                            exact
                            render={(...renderProps) => (
                                <Makes {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/fahrzeuge/:searchQuery"
                            exact
                            render={(...renderProps) => (
                                <InventoryPage {...renderProps} {...this.props} />
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
                        <Route
                            path="/comments"
                            exact
                            render={(...renderProps) => (
                                <Comments {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/orders"
                            exact
                            render={(...renderProps) => (
                                <Orders {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/requests"
                            exact
                            render={(...renderProps) => (
                                <Requests {...renderProps} {...this.props} />
                            )}
                        />
                    </Switch>
                </div>
            </Router>
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


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
