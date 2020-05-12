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
import Textarea from './fields/textarea';

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

    const renderTextareaField = ({
        input,
        placeholder,
        label,
        meta: { touched, error },
    }) => (
    
            <Textarea
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



const contactForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <Row>
                <Col md="12">
                    <h3>KONTAKTIEREN SIE UNS</h3>
                </Col>
                <Col md="12">

                    <Row>
                        <Col md="6">
                            <div className="input-wrap">
                                <Field
                                    name="firstName"
                                    component={renderTextField}
                                    //label="DEIN NAME"
                                    placeholder="Name"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="6">
                            <div className="input-wrap">
                                <Field
                                    name="lastName"
                                    component={renderTextField}
                                    //label="DEIN FAMILIENNAME"
                                    placeholder="Familienname"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="6">
                            <div className="input-wrap">
                                <Field
                                    name="phone"
                                    component={renderTextField}
                                    //label="DEINE TELEFONNUMMER"
                                    placeholder="Telefonnummer"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="6">
                            <div className="input-wrap">
                                <Field
                                    name="email"
                                    component={renderTextField}
                                    //label="DEINE E-MAIL"
                                    placeholder="E-Mail-Addresse"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="subject"
                                    component={renderTextField}
                                    //label="THEMA"
                                    placeholder="Betreff der Nachricht"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="message"
                                    component={renderTextareaField}
                                    //label="NACHRICHT"
                                    placeholder="Nachricht"
                                >
                                </Field>

                            </div>

                        </Col>




                        <Col md="6">
                            <div className="input-wrap buttons">
                                <button type="submit" className="button" disabled={pristine || submitting}>KONTAKTIEREN SIE UNS</button>
                            </div>

                        </Col>
                    </Row>
                </Col>

            </Row>

        </form>

    )
}

export default reduxForm({
    form: 'contactForm'  // a unique identifier for this form
})(contactForm)
