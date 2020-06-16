import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
     
} from 'react-router-dom';




import HomePage from './views/homePage';
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


                    </Switch>
                </div>
        );
    }
}

export default Routes;