

import React, { Component } from 'react';
import Routes from './routes'
import whatsapp from './assets/images/whatsapp.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.googleMapsCallback = this.googleMapsCallback.bind(this);

    window.googleMapsCallback = this.googleMapsCallback;
    this.state = {
      popups: [],
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

    fetch('https://showroom-api.novamedia.agency/popup').then((res) => res.json()).then((result) => { console.log(result); this.setState({ popups: result }); })


  }



  render() {

    let popup;
    let visitedPopups = this.state.visitedPopups

    for (let i = 0; i < this.state.popups.length; i++) {
      if (!visitedPopups[this.state.popups[i]._id] || (visitedPopups[this.state.popups[i]._id] && visitedPopups[this.state.popups[i]._id] + 24*60*60 < Math.floor(Date.now() / 1000))) {
        popup = this.state.popups[i];
        break;
      }
    }



    return (
      <>
        <Routes
          {...this.state}
        />
        <a href="https://api.whatsapp.com/send?phone=+4972549566162" className="whatsapp"><img src={whatsapp} /></a>
        {popup ?
          <div className="modal-overlay">
            <div>
              <button className="close-btn" onClick={() => {
                visitedPopups[popup._id] = Math.floor(Date.now() / 1000);
                this.setState({
                  visitedPopups: visitedPopups
                })
                this.forceUpdate();
              }}></button>
              <img src={popup.image} />
              <h3>{popup.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: popup.content }}></div>
            </div>
          </div>
          :
          null
        }

      </>

    );

  }

}

export default App;
