import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderTextField, renderCheckField, renderDateTimeField, renderImageField, renderHtmlField, renderTextareaField, renderSelectField } from './fields/renderFields';

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
                                <h3 className="title">Car</h3>
                                <h6 className="subtitle">Enter informations</h6>

                            </Col>

                            <Col lg="6">
                                <Row>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="make"
                                            component={renderTextField}
                                            label={"Make"}
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
                                            name="fuel"
                                            component={renderSelectField}
                                            label={"Fuel"}
                                            placeholder=""
                                        >
                                            <option value="diesel">Diesel</option>
                                            <option value="gasoline">Gasoline</option>
                                            <option value="hybrid">Hybrid</option>
                                            <option value="electric">Electric</option>
                                        </Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="transmission"
                                            component={renderSelectField}
                                            label={"Transmission"}
                                            placeholder=""
                                        >
                                            <option value="manual">Manual</option>
                                            <option value="automatic">Automatic</option>
                                        </Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="class"
                                            component={renderSelectField}
                                            label={"Class"}
                                            placeholder=""
                                        >
                                            <option value="cabriolet-roadster">Cabriolet / Roadster</option>

                                            <option value="estate-car">Estate Car</option>

                                            <option value="saloon">Saloon</option>

                                            <option value="small-car">Small Car</option>

                                            <option value="sports-car-coupe">Sports Car / Coupe</option>

                                            <option value="suv-off-road-vehicle-pickup-truck">SUV / Off-road Vehicle / Pickup Truck</option>

                                            <option value="van-minibus">Van / Minibus</option>



                                        </Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="mileage"
                                            component={renderTextField}
                                            label={"Mileage"}
                                            placeholder=""
                                        ></Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="color"
                                            component={renderSelectField}
                                            label={"Color"}
                                            placeholder=""
                                        >
                                            <option value="red">Red</option>
                                            <option value="blue">Blue</option>
                                            <option value="black">Black</option>
                                            <option value="silver">Silver</option>
                                            <option value="yellow">Yellow</option>
                                            <option value="green">Green</option>
                                            <option value="white">White</option>

                                        </Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="seatCount"
                                            component={renderTextField}
                                            label={"Seat count"}
                                            placeholder=""
                                        ></Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="location"
                                            component={renderTextField}
                                            label={"Location"}
                                            placeholder=""
                                        ></Field>
                                    </Col>

                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="content"
                                            component={renderHtmlField}
                                            label={"Tekst"}
                                            placeholder=""
                                        ></Field>
                                    </Col>



                                </Row>
                            </Col>
                            <Col lg="6" className="input-wrap">

                                <Field
                                    name="image"
                                    component={renderImageField}

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
    form: 'form'  // a unique identifier for this form
})(form)