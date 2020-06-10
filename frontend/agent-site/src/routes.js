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
import Register from './views/register';







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
                            path="/register"
                            exact
                            render={(...renderProps) => (
                                <Register {...renderProps} {...this.props} />
                            )}
                        />

                    </Switch>
                </div>
            </Router >
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
