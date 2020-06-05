import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderSelectField, renderTextField } from './fields/renderFields';
import {
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"

const form = (props) => {
    const { handleSubmit, pristine, submitting } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Row>
            <Col lg="12" className="input-wrap">
                    <Field
                        name="firstName"
                        id="firstName"
                        component={renderTextField}
                        placeholder="First name"
                    ></Field>
                </Col>
                <Col lg="12" className="input-wrap">
                    <Field
                        name="lastName"
                        id="lastName"
                        component={renderTextField}
                        placeholder="Last name"
                    ></Field>
                </Col>

                <Col lg="12" className="input-wrap">
                    <Field
                        name="email"
                        id="email"
                        component={renderTextField}
                        placeholder="E-mail address"
                        type="email"
                    ></Field>
                </Col>

                <Col lg="12" className="input-wrap">
                    <Field
                        name="username"
                        id="username"
                        component={renderTextField}
                        placeholder="Korisničko ime"
                    ></Field>
                </Col>
                <Col lg="12" className="input-wrap">
                    <Field
                        name="password"
                        id="password"
                        component={renderTextField}
                        placeholder="Lozinka"
                        type="password"
                    ></Field>
                </Col>
                <Col lg="12">
                    <button id="login-button">REGISTRUJ SE</button>
                </Col>
            </Row>
        </form>
    )
}

export default reduxForm({
    form: 'form'
})(form)
