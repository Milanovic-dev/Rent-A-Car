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
import File from './fields/file';

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

    const renderFileField = ({
        input,
        placeholder,
        meta: { touched, error },
    }) => (
    
            <File
                placeholder={placeholder}
                errorText={touched && error}
                error={touched && error}
                {...input}
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



const jobForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <Row>
                <Col md="12">
                    <h3 className="job-form-title">Jetzt Online Bewerben</h3>
                </Col>
                <Col md="12">

                    <Row>
                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="name"
                                    component={renderTextField}
                                    //label="DEIN NAME"
                                    placeholder="Name"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="email"
                                    component={renderTextField}
                                    //label="DEIN FAMILIENNAME"
                                    placeholder="E-Mail-Adresse"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="position"
                                    component={renderTextField}
                                    //label="DEINE TELEFONNUMMER"
                                    placeholder="Bereich"
                                >
                                </Field>

                            </div>

                        </Col>

                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="cv[0]"
                                    component={renderFileField}
                                    //label="THEMA"
                                    placeholder="Betreff der Nachricht"
                                >
                                </Field>

                            </div>

                        </Col>
                        <Col md="12">
                            <div className="input-wrap">
                                <Field
                                    name="cv[1]"
                                    component={renderFileField}
                                    //label="THEMA"
                                    placeholder="Lebenslauf"
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
                                    placeholder="Deine Nachricht"
                                >
                                </Field>

                            </div>

                        </Col>



                        { props.done ?
                        <Col lg="12">

                        <p>
                        Sehr geehrte Damen und Herren,<br/>

vielen Dank für die uns zugesandten Bewerbungsunterlagen, deren Eingang wir Ihnen hiermit bestätigen.<br/><br/>

Die Bearbeitung der gesamten Bewerbungsunterlagen wird allerdings noch zwei Wochen in Anspruch nehmen. Wir bitten Sie daher um etwas Geduld. Wir werden so schnell wie möglich wieder auf Sie zukommen.<br/><br/>

Mit freundlichen Grüßen<br/>
SCHOWROOM TEAM</p>
                        </Col>
                        :
                        !props.loading ? 
                        <Col md="6">
                            <div className="input-wrap buttons">
                                <button type="submit" className="button" disabled={pristine || submitting}>SENDEN</button>
                            </div>

                        </Col>
                        :
                        null
                        }
                    </Row>
                </Col>

            </Row>

        </form>

    )
}

export default reduxForm({
    form: 'jobForm'  // a unique identifier for this form
})(jobForm)
