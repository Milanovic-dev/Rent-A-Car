import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';  // ES6
import Text from './fields/text';
import { handleMobileSearchForm } from '../../actions/index';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Isvg from 'react-inlinesvg';

import DateTime from './fields/datePicker';
import Select from './fields/select';
import RangeSlider from './fields/rangeSlider';
import Tabs from './fields/tabs';

import car_icon from '../../assets/svg/car.svg';

const renderTextField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
}) => (

        <Text
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            {...input}
        />
    )

const renderSelectField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    children,
}) => (

        <Select
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            {...input}
            children={children}
        />
    )


const renderTabsField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    children,
}) => (

        <Tabs
            {...input}
            children={children}
        />
    )

const renderRangeSliderField = ({
    input,
    label,
    meta: { touched, error },
    children,
    min, max, defaultValue
}) => (

        <RangeSlider
            label={label}
            errorText={touched && error}
            {...input}
            children={children}
            min={min}
            max={max}
            defaultValue={defaultValue}
        />
    )

export const renderDateTimeField = ({
  input,
  placeholder,
  label,
  meta: { touched, error },
}) => (

    <DateTime
      placeholder={placeholder}
      label={label}
      errorText={touched && error}
      error={touched && error}

      {...input}
    />
  )


let SearchForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    //console.log(props);

    //console.log(props.productFilters);
    let models;
    if (props.manufacturer && props.productFilters && props.productFilters.manufacturers) {
        for (let i = 0; i < props.productFilters.manufacturers.length; i++) {
            if (props.productFilters.manufacturers[i].name === props.manufacturer) {
                models = props.productFilters.manufacturers[i].models;
            }
        }

    }

    return (
        <Container className={props.searchForm ? "search-form" : "search-form hide-mobile"}>
            <h3>LET'S FIND PERFECT CAR FOR YOU!</h3>
            <i className="mdi mdi-close hide-desktop" onClick={() => props.handleMobileSearchForm(null)}></i>
            <form onSubmit={handleSubmit} className="contact-form">
                <Row>
                    <Col lg="10" xs="12" className="tabs">
                        <Field
                            name="condition"
                            component={renderTabsField}
                        >
                            <option value="all">Primary search</option>
                            <option value="ankauf">Extended search</option>
                        </Field>
                    </Col>
                    <Col lg="2" className="num-results hide-mobile">
                        <Isvg src={car_icon} /> {props.productFilters && props.productFilters.carCount} Vehicle available
                </Col>

                </Row>
                <div className="form-wrap">
                    <Row >
                        <Col lg="6">
                            <div className="input-wrap">
                                <Field
                                    name="takePoint"
                                    component={renderTextField}
                                    placeholder="Start place"
                                    label="Pick a place where you what to pick up your vehicle"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <div className="input-wrap">
                                <Field
                                    name="takeDate"
                                    component={renderDateTimeField}
                                    label="Choose a date and time to pick up your vehicle"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <div className="input-wrap">
                                <Field
                                    name="returnDate"
                                    component={renderDateTimeField}
                                    label="Choose a date and time to return your vehicle"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <div className="input-wrap buttons">
                                <button type="button" className="button clear-btn" onClick={reset}>Reset</button>
                                <button type="submit" className="button black-btn right-chevron" >Search</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </form>
        </Container>

    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    //console.log(dispatch);
    return {
        handleMobileSearchForm: (val) => {
            dispatch(handleMobileSearchForm(val))
        }
    }
}


SearchForm = reduxForm({
    form: 'searchForm', // a unique identifier for this form,
    initialValues: { condition: 'all' }
})(SearchForm)


// Decorate with connect to read form values
const selector = formValueSelector('searchForm') // <-- same as form name
SearchForm = connect(state => {
    // can select values individually
    const manufacturer = selector(state, 'manufacturer')
    return {
        manufacturer,
        searchForm: state.searchForm
    }
}, mapDispatchToProps)(SearchForm)

export default SearchForm
