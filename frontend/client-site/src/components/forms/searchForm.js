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
                    
                </Row>
                <div className="form-wrap">
                    <Row >
                        <Col lg="4">
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
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="takeDate"
                                    component={renderDateTimeField}
                                    label="Choose a date and time to pick up your vehicle"
                                />
                            </div>
                        </Col>
                        <Col lg="4">
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
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="make"
                                    component={renderSelectField}
                                    label="Choose a make"
                                >
                                {
                                    /*
                                    props.productFilters && props.productFilters.productFilters.make.map((make, idx) => {
                                        return (
                                            <option value={make}>{make}</option>
                                        )
                                    })
                                    */
                                }
                                </Field>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="model"
                                    component={renderSelectField}
                                    label="Choose a model"
                                >
                                {
                                    /*
                                    props.productFilters && props.productFilters.model.map((model, idx) => {
                                        return (
                                            <option value={model}>{model}</option>
                                        )
                                    })
                                    */
                                }
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="fuel"
                                    component={renderSelectField}
                                    label="Choose a fuel"
                                >
                                {
                                    /*
                                    props.productFilters && props.productFilters.fuel.map((fuel, idx) => {
                                        return (
                                            <option value={fuel}>{fuel}</option>
                                        )
                                    })
                                    */
                                }   
                                </Field>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="transmission"
                                    component={renderSelectField}
                                    label="Choose a transmission"
                                >
                                {
                                    /*
                                    props.productFilters && props.productFilters.transmission.map((transmission, idx) => {
                                        return (
                                            <option value={transmission}>{transmission}</option>
                                        )
                                    })
                                    */
                                }  
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="class"
                                    component={renderSelectField}
                                    label="Choose a class"
                                >
                                {
                                    /*
                                    props.productFilters && props.productFilters.class.map((carClass, idx) => {
                                        return (
                                            <option value={carClass}>{carClass}</option>
                                        )
                                    })
                                    */
                                }  
                                </Field>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="cdw"
                                    component={renderSelectField}
                                    label="Has a cdw?"
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="lowestPrice"
                                    component={renderTextField}
                                    label="Choose a lowest price"
                                />
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="highestPrice"
                                    component={renderTextField}
                                    label="Choose a highest price"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="Mileage"
                                    component={renderTextField}
                                    label="Choose a mileage"
                                />
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="intentedMileage"
                                    component={renderTextField}
                                    label="Choose an intendent Mileage"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="seatCount"
                                    component={renderTextField}
                                    label="Choose an seat count"
                                />
                            </div>
                        </Col>
                        <Col lg="4">
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
