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

const resetPasswordForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form space-form">
            <Row>
                <Col md="12">
                    <h3>RESET PASSWORD</h3>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <p> Enter your email in empty field. Than press send to get an email with new generated password. You can change generated password any time.</p>
                </Col>
            </Row>
            <Row>
                <Col md="12" className="input-wrap">
                    <Field
                        name="email"
                        component={renderTextField}
                        label={"Enter your email"}
                        placeholder="Email"
                    />
                </Col>
            </Row>
            <Row>
                 <Col md="12">
                    <div className="input-wrap buttons">
                        <button type="submit" className="button" disabled={pristine || submitting}>Send</button>
                    </div>
                </Col>
            </Row>
        </form>
    )
}

export default reduxForm({
    form: 'resetPasswordForm'  // a unique identifier for this form
})(resetPasswordForm)