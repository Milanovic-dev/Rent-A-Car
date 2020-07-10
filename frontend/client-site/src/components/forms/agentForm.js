import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Row,
    Col,
} from 'reactstrap';
import Text from './fields/text';

const renderTextField = ({
    input,
    placeholder,
    label,
    type,
    meta: { touched, error },
}) => (

        <Text
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            type={type}
            {...input}
        />
    )

const agentForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form space-form">
            <Row>
                <Col md="12">
                    <h3>Register agent</h3>
                </Col>
            </Row>
                <Row>
                    <Col md="12" className="input-wrap">
                        <Field
                            name="companyName"
                            component={renderTextField}
                            label={"Company Name"}
                            placeholder="Name"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="input-wrap">
                        <Field
                            name="username"
                            component={renderTextField}
                            label={"Company Username"}
                            placeholder="Username"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="input-wrap">
                        <Field
                            name="password"
                            component={renderTextField}
                            label={"Company Secret"}
                            placeholder="Password"
                            type="password"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div className="input-wrap buttons">
                            <button type="submit" className="button" disabled={pristine || submitting}>Register</button>
                        </div>
                    </Col>
                </Row>
            </form>
    )
}

export default reduxForm({
    form: 'agentForm'  // a unique identifier for this form
})(agentForm)
