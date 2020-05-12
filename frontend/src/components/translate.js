import React, { Component } from 'react';
import { connect } from 'react-redux';

class Translate extends Component {
    render() {
        return (
            this.props.translations[this.props.text] ? this.props.translations[this.props.text] : this.props.text
        )
    }
}
const mapStateToProps = state => ({
    translations: state.translations[state.language],
});



export default connect(mapStateToProps)(Translate);
