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

const changePasswordForm = (props) => {
    const { handleSubmit, pristine, submitting, status } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form space-form">
            <Row>
                <Col md="12">
                    <h3>CHANGE PASSWORD</h3>
                </Col>
            </Row>
                <Row>
                    <Col md="12" className="input-wrap">
                        <Field
                            name="oldPassword"
                            component={renderTextField}
                            label={"Enter your old password"}
                            placeholder="Old Password"
                            type="password"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="input-wrap">
                        <Field
                            name="newPassword"
                            component={renderTextField}
                            label={"Enter your new password"}
                            placeholder="New Password"
                            type="password"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div className="input-wrap buttons">
                            <button type="submit" className="button" disabled={pristine || submitting}>Change password</button>
                        </div>
                    </Col>
                </Row>
            </form>
    )
}

export default reduxForm({
    form: 'changePasswordForm'  // a unique identifier for this form
})(changePasswordForm)