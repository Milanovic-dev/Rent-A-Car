import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';

const lighModes = ['mode-normal', 'mode-dark', 'mode-light']

export const DefaultLayout = (Wrapped) => (props) => {
    return (
        <div className={"wrapper " + lighModes[props.lightMode]}>
            <Header {...props} />
            <Wrapped {...props} />
            <Footer {...props} />
        </div>
    );
};

export default DefaultLayout;