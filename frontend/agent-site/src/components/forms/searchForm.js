import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';  // ES6

import { handleMobileSearchForm } from '../../actions/index';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Isvg from 'react-inlinesvg';

import Select from './fields/select';
import RangeSlider from './fields/rangeSlider';
import Tabs from './fields/tabs';

import car_icon from '../../assets/svg/car.svg';

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
            <form onSubmit={handleSubmit} >

                <Row>
                    <Col lg="10" xs="12" className="tabs">
                        <Field
                            name="condition"
                            component={renderTabsField}
                        >
                            <option value="all">Vehicle search</option>
                            <option value="ankauf">Ankauf</option>
                        </Field>
                    </Col>
                    <Col lg="2" className="num-results hide-mobile">
                        <Isvg src={car_icon} /> {props.productFilters && props.productFilters.carCount} Vehicle available
                </Col>

                </Row>
                <div className="form-wrap">
                    <Row >

                        <Col md="4">
                            <div className="input-wrap">
                                <Field
                                    name="manufacturer"
                                    component={renderSelectField}
                                    label="Make"
                                    placeholder="- CHOOSE VEHICLE MAKE -"
                                >
                                    {
                                        props.productFilters && props.productFilters.manufacturers && props.productFilters.manufacturers.map((manufacturer, idx) => {
                                            return (
                                                <option value={manufacturer.name}>{manufacturer.name}</option>
                                            )
                                        })
                                    }
                                </Field>

                            </div>

                        </Col>

                        <Col md="4">
                            <div className="input-wrap">
                                {models ?
                                    <Field
                                        name="model"
                                        component={renderSelectField}
                                        label="MODELLFAHRZEUG"
                                        placeholder="- WÄHLEN SIE EIN FAHRZEUGMODELL -"
                                    >
                                        {
                                            models && models.map((model, idx) => {
                                                return (
                                                    <option value={model}>{model}</option>
                                                )
                                            })
                                        }
                                    </Field>
                                    :
                                    null
                                }

                            </div>

                        </Col>

                        <Col md="2">
                            <div className="input-wrap">
                                <Field
                                    name="year[0]"
                                    component={renderSelectField}
                                    label=""
                                    placeholder="FROM"
                                >
                                    {
                                        [...Array(Math.abs(props.productFilters.maxProductionYear - props.productFilters.minProductionYear) + 1)].map((x, i) => { return (<option value={props.productFilters.minProductionYear + i}>{props.productFilters.minProductionYear + i}</option>) })}
                                </Field>

                            </div>

                        </Col>


                        <Col md="2">
                            <div className="input-wrap">
                                <Field
                                    name="year[1]"
                                    component={renderSelectField}
                                    placeholder="TO"
                                >
                                    {
                                        [...Array(Math.abs(props.productFilters.maxProductionYear - props.productFilters.minProductionYear) + 1)].map((x, i) => { return (<option value={props.productFilters.minProductionYear + i}>{props.productFilters.minProductionYear + i}</option>) })}

                                </Field>

                            </div>

                        </Col>


                        <Col md="4">
                            <div className="input-wrap">
                                <Field
                                    name="color"
                                    component={renderSelectField}
                                    label="Color"
                                    placeholder="- CHOOSE VEHICLE COLOR -"
                                >
                                    {
                                        props.productFilters && props.productFilters.colors && props.productFilters.colors.map((color, idx) => {
                                            return (
                                                <option value={color}>{color}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="input-wrap">
                                <Field
                                    name="price"
                                    component={renderRangeSliderField}
                                    label="Price"
                                    min={props.productFilters.minPrice}
                                    max={props.productFilters.maxPrice}
                                    defaultValue={[props.productFilters.minPrice, props.productFilters.maxPrice]}
                                />
                            </div>
                        </Col>

                        <Col md="4">
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
/*
const mapStateToProps = state => ({
    searchForm: state.searchForm,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(dispatch);
    return {
        handleMobileSearchForm: (val) => {
            dispatch(handleMobileSearchForm(val))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchForm'  // a unique identifier for this form
})(SearchForm));
*/
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
