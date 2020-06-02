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
import Html from './fields/html';
import Image from './fields/image';
import Date from './fields/date';

import RangeSlider from './fields/rangeSlider';

import car_icon from '../../assets/svg/car.svg';

const renderImageField = ({
    input,
    placeholder,
    meta: { touched, error }
}) => (
        <Image
            placeholder={placeholder}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />
    )

const renderHtmlField = ({
    input,
    placeholder,
    label,
    type,
    meta: { touched, error }
}) => (
        <Html
            placeholder={placeholder}
            label={label}
            type={type}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />
    )
const renderDateField = ({
    input,
    placeholder,
    label,
    type,
    meta: { touched, error },
}) => (
        <Date
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            type={type}
            error={touched && error}
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



const busyCarForm = (props) => {
    
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <Row>
                <Col lg="12">
                    
                </Col>
                <Col lg="6">

                    <Row>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="date_from"
                                component={renderDateField}
                                label={"FROM"}
                                // placeholder="Make"
                            ></Field>
                       
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="date_to"
                                component={renderDateField}
                                label={"TO"}
                                // placeholder="Make"
                            ></Field>
                       
                        </Col>
                    </Row>
                </Col>


                <Col lg="12">
                    <div className="input-wrap buttons">
                        <button type="submit" className="button" disabled={pristine || submitting}> SAVE </button>
                    </div>

                </Col>

            </Row>

        </form>

    )
}

export default reduxForm({
    form: 'busyCarForm'  // a unique identifier for this form
})(busyCarForm)
