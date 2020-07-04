import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import { formValueSelector } from 'redux-form';  // ES6
import { connect } from 'react-redux';

import { handleMobileSearchForm } from '../../actions/index';

import Select from './fields/select';
import RangeSlider from './fields/rangeSlider';

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



let FilterForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, productFilters } = props;

    return (
        <div className={props.searchForm ? "filter-form" : "filter-form hide-mobile"}>
            <h3>SEARCH OPTIONS</h3>
            <form onSubmit={handleSubmit} >
                <Row>
                    <Col md="12">
                        <div className="input-wrap">
                            <Field
                                name="manufacturer"
                                component={renderSelectField}
                                label="Make"
                                placeholder="- Choose make -"
                            >
                                {
                                    productFilters && props.productFilters.makes && props.productFilters.makes.map((name, idx) => {
                                        return (
                                            <option value={name}>{name}</option>
                                        )
                                    })
                                }
                            </Field>

                        </div>

                    </Col>
                    {productFilters.models ?
                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="model"
                                    component={renderSelectField}
                                    label="Model"
                                    placeholder= "- Choose make -"
                                >
                                    {
                                        productFilters && productFilters.models.map((model, idx) => {
                                            return (
                                                <option value={model}>{model}</option>
                                            )
                                        })
                                    }
                                </Field>

                            </div>

                        </Col>

                        :
                        null

                    }

                    <Col md="12">
                        <div className="input-wrap">
                            <Field
                                name="class"
                                component={renderSelectField}
                                label="CLASS"
                                placeholder="- Choose class -"
                            >
                                {
                                    productFilters && productFilters.classes && productFilters.classes.map((name, idx) => {
                                        return (
                                            <option value={name}>{name}</option>
                                        )
                                    })
                                }

                            </Field>

                        </div>

                    </Col>

                    <Col md="12">
                        <div className="input-wrap">
                            <Field
                                name="fuel"
                                component={renderSelectField}
                                placeholder="- Choose fuel -"
                                label="FUEL"
                            >

                                {
                                    productFilters && productFilters.fuels && productFilters.fuels.map((color, idx) => {
                                        return (
                                            <option value={color}>{color}</option>
                                        )
                                    })
                                }

                            </Field>

                        </div>

                    </Col>
                    
                    <Col md="12">
                        <div className="input-wrap">
                            <Field
                                name="transmission"
                                component={renderSelectField}
                                label="TRANSMISSION"
                                placeholder="- Choose transmission -"
                            >
                                {
                                    productFilters && productFilters.transmissions && productFilters.transmissions.map((color, idx) => {
                                        return (
                                            <option value={color}>{color}</option>
                                        )
                                    })
                                }
                            </Field>

                        </div>

                    </Col>
                
                   <Col md="12">
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
                    <Col md="12">
                    <div className="input-wrap">
                            <Field
                                name="mileage"
                                component={renderRangeSliderField}
                                label="Mileage"
                                min={props.productFilters.minMileage}
                                max={props.productFilters.maxMileage}
                                defaultValue={[props.productFilters.minMileage, props.productFilters.maxMileage]}
                            />
                    </div>
                    </Col>

                    <Col md="12">
                        <div className="input-wrap buttons">
                            <button type="submit" className="button black-btn right-chevron" >SEARCH</button>

                            <button type="button" className="button clear-btn" onClick={reset}>Reset</button>
                        </div>
                    </Col>
                </Row>

            </form>
        </div>

    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(dispatch);
    return {
        handleMobileSearchForm: (val) => {
            dispatch(handleMobileSearchForm(val))
        }
    }
}

console.log(FilterForm);

FilterForm = reduxForm({
    form: 'filterForm', // a unique identifier for this form,
})(FilterForm)


// Decorate with connect to read form values
const selector = formValueSelector('filterForm') // <-- same as form name
FilterForm = connect((state, ownProps) => {
    // can select values individually
    console.log(ownProps);
    const manufacturer = selector(state, 'manufacturer')
    return {
        manufacturer,
        searchForm: state.searchForm
    }
}, mapDispatchToProps)(FilterForm)

export default FilterForm;