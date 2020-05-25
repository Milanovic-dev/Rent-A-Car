import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderSelectField, renderTextField} from './fields/renderFields';
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
                {/* <Col lg="12" className="input-wrap">
                    <Field
                        name="type"
                        component={renderSelectField}
                        label={"User type"}
                        placeholder="Choose type"
                        validate={[required]}
                        id="type"
                    >
                        <option value="admin">Administrator</option>
                    </Field>

                </Col> */}

                <Col lg="12" className="input-wrap">
                    <Field
                        name="username"
                        id="username"
                        component={renderTextField}
                        placeholder="Enter username"
                        label="Username"
                    ></Field>
                </Col>
                <Col lg="12" className="input-wrap">
                    <Field
                        name="password"
                        id="password"
                        component={renderTextField}
                        placeholder="Enter password"
                        label="Password"
                        type="password"
                    ></Field>
                </Col>

                {/* <Col lg="12">
                    <label>Username:</label><br/>
                    <input type="text" id="username"/><br/><br/>
                    <label>Password:</label><br/>
                    <input type="password" id="password"/><br/><br/>
                </Col> */}

                <Col lg="12">
                    <button id="login-button">SIGN IN</button>
                </Col>
            </Row>
        </form>
    )
}

export default reduxForm({
    form: 'form'
})(form)