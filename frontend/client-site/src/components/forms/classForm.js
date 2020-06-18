import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from './fields/renderFields';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"


const form = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h3>Create or edit class</h3>
            <Row>
                <Col lg="6" className="input-wrap">
                    <Field
                        name="name"
                        component={renderTextField}
                        label={"Name"}
                        placeholder=""
                    ></Field>
                </Col>

                <Col lg="12" className="input-wrap">
                    <button className="button">Save</button>

                </Col>

            </Row>

        </form>
    )
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
