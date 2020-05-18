import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import Calendar from 'react-calendar';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Isvg from 'react-inlinesvg';

import Select from './fields/select';
import Text from './fields/text';

import RangeSlider from './fields/rangeSlider';

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




const renderCalendarField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    children,
}) => (
        <Calendar
            {...input}
        />
    )

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



const serviceForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (
        <section className="section plan-service-section">
            <Container>
                <Row>
                    <Col md="12">
                        <div className="sub-title text-center">
                            <h2>PLAN  <span className="text-primary">SERVICE</span></h2>
                            <p>Vereinbaren sie ihren termin</p>
                        </div>
                    </Col>
                </Row>
                <div className="service-form">
                    <form onSubmit={handleSubmit} >
                        <Row>
                            <Col md="12">
                                <h3>EINEN TERMIN MACHEN</h3>
                            </Col>
                            <Col md="8">
                                <Row>
                                    <Col md="6">
                                        <div className="input-wrap">
                                            <Field
                                                name="favoriteColor1"
                                                component={renderTextField}
                                                label="DEIN NAME"
                                                placeholder="Geben Sie einen Namen ein"
                                            >
                                            </Field>

                                        </div>

                                    </Col>

                                    <Col md="6">
                                        <div className="input-wrap">
                                            <Field
                                                name="favoriteColor1"
                                                component={renderTextField}
                                                label="DINE E-MAIL"
                                                placeholder="E-Mail-Addresse"
                                            >
                                            </Field>

                                        </div>

                                    </Col>

                                    <Col md="6">
                                        <div className="input-wrap">
                                            <Field
                                                name="favoriteColor1"
                                                component={renderTextField}
                                                label="DEIN TELEFON"
                                                placeholder="Telefonnummer"
                                            >
                                            </Field>

                                        </div>

                                    </Col>

                                    <Col md="6">
                                        <div className="input-wrap">
                                            <Field
                                                name="favoriteColor4"
                                                component={renderSelectField}
                                                placeholder="Marke / Modell"
                                                label="AUTO"
                                            >
                                                <option value="ff0000">Red</option>
                                                <option value="00ff00">Green</option>
                                                <option value="0000ff">Blue</option>
                                            </Field>

                                        </div>

                                    </Col>


                                    <Col md="6">
                                        <div className="input-wrap">
                                            <Field
                                                name="favoriteColor1"
                                                component={renderTextField}
                                                label="AUTO MILEAGE"
                                                placeholder="Millage (optional)"
                                            >

                                            </Field>

                                        </div>

                                    </Col>


                                    <Col md="6">
                                        <div className="input-wrap buttons">
                                            <button type="submit" className="button" disabled={pristine || submitting}>EINEN TERMIN MACHEN</button>
                                        </div>

                                    </Col>
                                </Row>
                            </Col>
                            <Col md="4">

                                <Field
                                    name="favoriteColor1"
                                    component={renderCalendarField}
                                >

                                </Field>



                            </Col>
                        </Row>

                    </form>
                </div>
            </Container>
        </section>

    )
}

export default reduxForm({
    form: 'serviceForm'  // a unique identifier for this form
})(serviceForm)
