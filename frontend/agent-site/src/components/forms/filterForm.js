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
    const { handleSubmit, pristine, reset, submitting } = props;
    let models;
    if (props.manufacturer && props.productFilters && props.productFilters.manufacturers) {
        for (let i = 0; i < props.productFilters.manufacturers.length; i++) {
            if (props.productFilters.manufacturers[i].name === props.manufacturer) {
                models = props.productFilters.manufacturers[i].models;
            }
        }

    }
    return (
        <div className={props.searchForm ? "filter-form" : "filter-form hide-mobile"}>

            <h3>SUCHOPTIONEN</h3>
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
                                    props.productFilters && props.productFilters.manufacturers && props.productFilters.manufacturers.map((manufacturer, idx) => {
                                        return (
                                            <option value={manufacturer.name}>{manufacturer.name}</option>
                                        )
                                    })
                                }
                            </Field>

                        </div>

                    </Col>
                    {models ?
                        <Col md="12">
                            <div className="input-wrap">
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

                            </div>

                        </Col>

                        :
                        null

                    }

                    <Col md="12">
                        <div className="input-wrap">
                            <Field
                                name="color"
                                component={renderSelectField}
                                label="FAHRZEUGFARBE"
                                placeholder="- WÄHLE EINE FARBE -"
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

                    <Col md="12">
                        <div className="input-wrap">
                            <Field
                                name="fuel"
                                component={renderSelectField}
                                placeholder="- MOTORTYP -"
                                label="MOTORTYP"
                            >

                                {
                                    props.productFilters && props.productFilters.fuels && props.productFilters.fuels.map((color, idx) => {
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
                                label="GETRIEBE"
                                placeholder="- GETRIEBE -"
                            >
                                {
                                    props.productFilters && props.productFilters.transmissions && props.productFilters.transmissions.map((color, idx) => {
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
                                name="year"
                                component={renderRangeSliderField}
                                label="Erstzulassung"
                                min={props.productFilters.minProductionYear}
                                max={props.productFilters.maxProductionYear}
                                defaultValue={[props.productFilters.minProductionYear, props.productFilters.maxProductionYear]}

                            ></Field>


                        </div>

                    </Col>

                    <Col md="12">
                        <div className="input-wrap">
                            <Field
                                name="price"
                                component={renderRangeSliderField}
                                label="Preis"
                                min={props.productFilters.minPrice}
                                max={props.productFilters.maxPrice}
                                defaultValue={[props.productFilters.minPrice, props.productFilters.maxPrice]}

                            ></Field>


                        </div>

                    </Col>

                    <Col md="12">
                        <div className="input-wrap buttons">
                            <button type="submit" className="button black-btn right-chevron" >SUCHE</button>

                            <button type="button" className="button clear-btn" onClick={reset}>Zurücksetzen</button>


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