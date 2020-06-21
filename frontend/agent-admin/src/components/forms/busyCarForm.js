import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderDateTimeField } from './fields/renderFields';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';


//const required = value => value ? undefined : "Required"


const form = (props) => {
    const { handleSubmit, pristine, submitting } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Car is busy:</h3>
                                <h6></h6>

                            </Col>


                        </Row>
                        <Row>
                            <Col lg="6" className="input-wrap">
                                <Field
                                    name="dateFrom"
                                    component={renderDateTimeField}
                                    label={"FROM"}
                                    placeholder="FROM"
                                ></Field>

                            </Col>
                            <Col lg="6" className="input-wrap">
                                <Field
                                    name="dateTo"
                                    component={renderDateTimeField}
                                    label={"TO"}
                                    placeholder="TO"
                                ></Field>

                            </Col>
                        </Row>
                    </Container>
                </Col>

                <Col lg="12">
                    <button className="button">Save</button>
                </Col>

            </Row>

        </form >
    )
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
