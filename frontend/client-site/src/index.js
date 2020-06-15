import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/materialdesignicons.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

