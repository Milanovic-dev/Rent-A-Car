import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderTextField, renderTextareaField } from './fields/renderFields';

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
        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Mileage report</h3>
                                <h6 className="subtitle">Enter informations</h6>

                            </Col>

                            <Col lg="12">
                                    <Col lg="4" className="input-wrap">
                                        <Field
                                            name="rentedCar"
                                            component={renderTextField}
                                            label={"Car"}
                                            placeholder=""
                                        ></Field>
                                    </Col>
                                    <Col lg="4" className="input-wrap">
                                        <Field
                                            name="mileage"
                                            component={renderTextField}
                                            label={"Mileage"}
                                            placeholder=""
                                            required
                                        ></Field>
                                    </Col>
                                    <Col lg="4" className="input-wrap">
                                        <Field
                                            name="additionalInfo"
                                            component={renderTextareaField}
                                            label={"Additional information"}
                                            placeholder=""
                                        ></Field>
                                    </Col>

                            </Col>

                        </Row>
                    </Container>
                </Col>
                <Col lg="12">
                    <button className="button">Save</button>

                </Col>

            </Row>

        </form>
    )
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
