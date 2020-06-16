import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderTextField} from './fields/renderFields';
import {
    Row,
    Col,
} from 'reactstrap';

//const required = value => value ? undefined : "Required"

const form = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Row>
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
                    <button id="login-button">PRIJAVI SE</button>
                </Col>
            </Row>
        </form>
    )
}

export default reduxForm({
    form: 'form'
})(form)
