import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import Text from './fields/text';
import Textarea from './fields/textarea';
import rightChevron from '../../assets/svg/right-chevron.svg';
import Isvg from 'react-inlinesvg';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"

const renderTextField = ({
    input,
    placeholder,
    meta: { touched, error },
}) => (

        <Text
            placeholder={placeholder}
            errorText={touched && error}
            error={touched && error}
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
            error={touched && error}
            {...input}
        />
    )


class form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const { handleSubmit, pristine, reset, submitting } = this.props;
        console.log(pristine, submitting);

        return (
            <form onSubmit={handleSubmit} className="contact-form">
                <Row>
                    <Col lg="12">
                        <h6>KONTAKTIEREN SIE UNS</h6>
                    </Col>
                    <Col lg="6">
                        <Field
                            name="firstName"
                            component={renderTextField}
                            validate={[required]}
                            placeholder='Name'

                        ></Field>
                    </Col>
                    <Col lg="6">
                        <Field
                            name="lastName"
                            component={renderTextField}
                            validate={[required]}
                            placeholder='Familienname'

                        ></Field>
                    </Col>
                    <Col lg="6">
                        <Field
                            name="phone"
                            component={renderTextField}
                            validate={[required]}
                            placeholder='Telefonnummer'

                        ></Field>
                    </Col>
                    <Col lg="6">
                        <Field
                            name="email"
                            component={renderTextField}
                            validate={[required]}
                            placeholder='E-Mail-Addresse'

                        ></Field>
                    </Col>
                    <Col lg="12">
                        <Field
                            name="subject"
                            component={renderTextField}
                            validate={[required]}
                            placeholder='Betreff der Nachricht'

                        ></Field>
                    </Col>
                    <Col lg="12">
                        <Field
                            name="message"
                            component={renderTextareaField}
                            validate={[required]}
                            placeholder='Nachricht'

                        ></Field>
                    </Col>
                    <Col lg="12">

                        {this.props.done ?
                            <p>Die Anfrage wurde erfolgreich gesendet, erwarte bald eine Antwort.</p>
                            :

                            <button className="button">KONTAKTIEREN SIE UNS {
                                this.props.loading ?
                                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    :
                                    null

                            } </button>
                        }
                    </Col>
                </Row>
            </form>
        )
    }
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
