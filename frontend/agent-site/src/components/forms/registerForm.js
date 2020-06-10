import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'


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





const renderTextField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    type,
}) => (

        <Text
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            {...input}
            type={type}
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



const registerForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form space-form">
            <Row>
                <Col md="12">
                    <h3>REGISTRATION</h3>
                </Col>
                <Col md="12">

                    <Row>
                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="firstName"
                                    component={renderTextField}
                                    //label="DEIN NAME"
                                    placeholder="First name"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="lastName"
                                    component={renderTextField}
                                    //label="DEIN FAMILIENNAME"
                                    placeholder="Last name"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="email"
                                    component={renderTextField}
                                    //label="DEINE TELEFONNUMMER"
                                    placeholder="E-mail"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="username"
                                    component={renderTextField}
                                    //label="DEINE E-MAIL"
                                    placeholder="Username"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="password"
                                    type="password"
                                    component={renderTextField}
                                    //label="THEMA"
                                    placeholder="Password"
                                >
                                </Field>

                            </div>

                        </Col>


                        <Col md="12">
                            <div className="input-wrap buttons">
                                <button type="submit" className="button">REGISTER</button>
                            </div>

                        </Col>
                    </Row>
                </Col>

            </Row>

        </form>

    )
}

export default reduxForm({
    form: 'registerForm'  // a unique identifier for this form
})(registerForm)
