import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderTextField, renderCheckField, renderDateTimeField, renderImageField, renderHtmlField, renderTextareaField, renderSelectField } from './fields/renderFields';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';



class form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col lg="12" >
                        <Container fluid className="form-box">
                            <Row>
                                <Col lg="6" className="input-wrap">
                                    <Field
                                        name="make"
                                        component={renderTextField}
                                        label={"Make"}
                                        placeholder=""
                                    ></Field>
                                    <Field
                                        name="_csrf"
                                        component={renderTextField}
                                        label={"CSRF"}
                                        placeholder=""
                                    ></Field>
                                </Col>
                                <Col lg="6" className="input-wrap">
                                    <Field
                                        name="model"
                                        component={renderTextField}
                                        label={"Model"}
                                        placeholder=""
                                    ></Field>
                                </Col>
                                <Col lg="6" className="input-wrap">
                                    <Field
                                        name="productionYear"
                                        component={renderTextField}
                                        label={"Production year"}
                                        placeholder=""
                                    ></Field>
                                </Col>
                                <Col lg="6" className="input-wrap">
                                    <Field
                                        name="power"
                                        component={renderTextField}
                                        label={"Power (kW)"}
                                        placeholder=""
                                    ></Field>
                                </Col>
                                {/* <Col lg="6" className="input-wrap">
                                    <Field
                                        name="mileage"
                                        component={renderTextField}
                                        label={"Mileage"}
                                        placeholder=""
                                    ></Field>
                                </Col>

                                
                                <Col lg="6" className="input-wrap">
                                    <Field
                                        name="seatCount"
                                        component={renderTextField}
                                        label={"Seat count"}
                                        placeholder=""
                                    ></Field>
                                </Col> */}
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
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
