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

const signInForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form space-form">
            <Row>
                <Col md="12">
                    <h3>SIGN IN</h3>
                </Col>
            </Row>
                <Row>
                    <Col md="12" className="input-wrap">
                        <Field
                            name="username"
                            component={renderTextField}
                            label={"Enter your username"}
                            placeholder="Username"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="input-wrap">
                        <Field
                            name="password"
                            component={renderTextField}
                            label={"Enter your password"}
                            placeholder="Password"
                            type="password"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <p>Don't have an account? <a href="/signup"><b>Register now</b></a></p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div className="input-wrap buttons">
                            <button type="submit" className="button" disabled={pristine || submitting}>Sign in</button>
                        </div>
                    </Col>
                </Row>
            </form>
    )
}

export default reduxForm({
    form: 'signInForm'  // a unique identifier for this form
})(signInForm)
