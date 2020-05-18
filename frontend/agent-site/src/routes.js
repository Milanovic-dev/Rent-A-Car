import React, { Component } from 'react';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {handleMobileSearchForm, handleMenu} from './actions/index';

import { createBrowserHistory } from 'history';
import { GoogleMapScript } from './components/googleMapScript';

import HomePage from './views/homePage';
import InventoryPage from './views/inventoryPage';
import SolutionsPage from './views/solutionsPage';
import GalleryPage from './views/galleryPage';
import DetailPage from './views/detailPage';
import AboutPage from './views/aboutPage';
import ContactPage from './views/contactPage';
import PurchasePage from './views/purchasePage';
import Page from './views/page';
import FinancePage from './views/financePage';

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
                            path="/finanzierung"
                            exact
                            render={(...renderProps) => (
                                <FinancePage {...renderProps} {...this.props} />
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
                            path="/seite/:alias"
                            exact
                            render={(...renderProps) => (
                                <Page {...renderProps} {...this.props} />
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
                            path="/cars/:id"
                            exact
                            render={(...renderProps) => (
                                <DetailPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/ankauf"
                            exact
                            render={(...renderProps) => (
                                <PurchasePage {...renderProps} {...this.props} />
                            )}
                        />


                        <Route
                            path="/service"
                            exact
                            render={(...renderProps) => (
                                <SolutionsPage {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/galerie"
                            exact
                            render={(...renderProps) => (
                                <GalleryPage {...renderProps} {...this.props} />
                            )}
                        />



                        <Route
                            path="/detail"
                            exact
                            render={(...renderProps) => (
                                <DetailPage {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/uber-uns"
                            exact
                            render={(...renderProps) => (
                                <AboutPage {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/kontakt"
                            exact
                            render={(...renderProps) => (
                                <ContactPage {...renderProps} {...this.props} />
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
