import React, { Component } from 'react';
import 'rc-slider/assets/index.css';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class RangeSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
                return (
            <div className="range-slider">
                <span>{this.props.label}</span>

                <Range
                    trackStyle={[{ background: '#DB2D2E', height: '7px', borderRadius: '6px' }]}
                    railStyle={{ background: '#D1D1D1', height: '7px' }}
                    handleStyle={[{ borderColor: '#DB2D2E', borderWidth: '4px', marginTop: '-4px' }, { borderColor: '#DB2D2E', borderWidth: '4px', marginTop: '-4px' }]}
                    tipProps={{ placement: 'bottom', visible: width >= 768 ? true:false }}
                    min={this.props.min}
                    max={this.props.max}
                    defaultValue={this.props.defaultValue}
                    onChange={(val) => this.props.onChange(val)}
                    value={this.props.value ? this.props.value : this.props.defaultValue}
                />

            </div>
        );
    }
}

export default RangeSlider;