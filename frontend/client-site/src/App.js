import React, { Component } from 'react';
import Routes from './routes'
import {Link} from 'react-router-dom';
import messageIcon from './assets/svg/email-icon.svg';
import Isvg from 'react-inlinesvg';

class App extends Component {
  constructor(props) {
    super(props);
    this.googleMapsCallback = this.googleMapsCallback.bind(this);

    window.googleMapsCallback = this.googleMapsCallback;
    this.state = {
      // popups: [],
      visitedPopups: {}
    }
  }

  googleMapsCallback() {
    this.setState({
      _googleMapsLoaded: true
    });
  }


  render() {

    let popup;
    let visitedPopups = this.state.visitedPopups

    return (
      <>
        <Routes
          {...this.state}
        />
                  <a href='/messages'>

        <div className="messages-icon">
          <Isvg src={messageIcon} />
          </div>
          </a>
      </>
    );
  }
}

export default App;
