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
        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Fuel</h3>
                                <h6 className="subtitle">Enter informations</h6>

                            </Col>

                            <Col lg="6">
                                <Row>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="name"
                                            component={renderTextField}
                                            label={"Name"}
                                            placeholder=""
                                        ></Field>
                                    </Col>

                                </Row>
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
