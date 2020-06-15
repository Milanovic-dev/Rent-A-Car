

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import welcome from './assets/images/welcome.png';
import DocumentMeta from 'react-document-meta';
import { withRouter } from 'react-router-dom';
import whatsapp from './assets/images/whatsapp.png';


const rootReducer = combineReducers({
  form: formReducer
});

const store = createStore(rootReducer)

function generateAlias(str) {
  str = str.toLowerCase();
  str = str.replace(/ä/g, 'a');
  str = str.replace(/ö/g, 'o');
  str = str.replace(/ü/g, 'u');
  str = str.replace(/ß/g, 'b');

  str = str.replace(/[^a-zA-Z0-9]/gi, '-').toLowerCase()
  str = str.replace(/-+/g, '-');

  return str;
}

if (String.prototype.generateAlias == null) {
  String.prototype.generateAlias = function () {
    return generateAlias(this);
  }
}


class App extends Component {


  constructor(props) {
    super(props);
    this.googleMapsCallback = this.googleMapsCallback.bind(this);

    if (typeof window !== 'undefined') {
      window.googleMapsCallback = this.googleMapsCallback;
    }

    this.state = {
      pages: []
    }



  }


  render() {
    let meta;
    if (this.state.metaTags) {
      meta = {
        title: this.state.metaTags.title,
        description: this.state.metaTags.description,
        //canonical: 'http://example.com/path/to/page',
        meta: {
          charset: 'utf-8',
          name: {
            'og:url': this.state.metaTags['og:url'],
            'og:title': this.state.metaTags['og:title'],
            'og:image': this.state.metaTags['og:image'],
            'og:description': this.state.metaTags['og:description'],
            'og:type': this.state.metaTags['og:type'],
          }
        }
      };
    }
    return (
      <Provider store={store}>
        {this.state.metaTags ? <DocumentMeta {...meta} /> : null}

        <Routes
          {...this.state}
          initialData={this.props.initialData}
        />
        <a href={"https://api.whatsapp.com/send?phone="+(this.state.settings && this.state.settings.phone) } className="whatsapp"><img src={whatsapp} /></a>

      </Provider>

    );

  }


  componentDidMount() {

    this.props.history.listen((location, action) => {

      // location is an object like window.location
      fetch('https://api.verkaufes24.de/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: location.pathname })
      }).then((res) => res.json()).then((result) => {

        this.setState({
          metaTags: result
        })
      });

      //console.log(action, location.pathname, location.state)
    });


    fetch('https://api.verkaufes24.de/settings', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    }).then((res) => res.json()).then((settings) => {
      this.setState({
        settings
      })
    })


    fetch('https://api.verkaufes24.de/pages', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    }).then((res) => res.json()).then((pages) => {
      this.setState({
        pages
      })
    })


  }

  componentDidUpdate(prevProps) {

  }



  googleMapsCallback() {
    console.log("true");
    this.setState({ _googleMapsLoaded: true });
  }

}

export default withRouter(App);
