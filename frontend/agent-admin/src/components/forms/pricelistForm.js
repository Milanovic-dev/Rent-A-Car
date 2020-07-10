import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderTextField, renderHtmlField, renderGalleryField, renderImageField, renderSelectField, renderDateTimeField } from './fields/renderFields';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

//const required = value => value ? undefined : "Required"

const form = (props) => {
    const { handleSubmit, pricelist } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Pricelist</h3>
                                <h6 className="subtitle">Enter informations</h6>

                            </Col>
                            <Col lg="3" className="input-wrap">
                                <Field
                                    name="pricePerDay"
                                    component={renderTextField}
                                    label="Price per day"
                                ></Field>
                            </Col>
                            <Col lg="3" className="input-wrap">
                                <Field
                                    name="pricePerKM"
                                    component={renderTextField}
                                    label="Price per KM"
                                ></Field>
                            </Col>
                            <Col lg="3" className="input-wrap">
                                <Field
                                    name="priceCDWP"
                                    component={renderTextField}
                                    label="Price CDWP"
                                ></Field>
                            </Col>
                            <Col lg="3" className="input-wrap">
                                <Field
                                    name="sale"
                                    component={renderTextField}
                                    label="Sale (%)"
                                ></Field>
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
    form: 'prForm'  // a unique identifier for this form
})(form)