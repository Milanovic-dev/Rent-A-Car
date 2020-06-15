import React, { Component } from 'react';
import Routes from './routes'

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


  componentDidMount() {
    fetch('https://showroom-api.novamedia.agency/home').then((res) => res.json()).then((result) => { console.log(result); this.setState(result); })

    // fetch('https://showroom-api.novamedia.agency/popup').then((res) => res.json()).then((result) => { console.log(result); this.setState({ popups: result }); })
  }



  render() {

    let popup;
    let visitedPopups = this.state.visitedPopups

    // for (let i = 0; i < this.state.popups.length; i++) {
    //   if (!visitedPopups[this.state.popups[i]._id] || (visitedPopups[this.state.popups[i]._id] && visitedPopups[this.state.popups[i]._id] + 24*60*60 < Math.floor(Date.now() / 1000))) {
    //     popup = this.state.popups[i];
    //     break;
    //   }
    // }

    return (
      <>
        <Routes
          {...this.state}
        />
      </>
    );
  }
}

export default App;
