import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Row,
    Col,
} from 'reactstrap';
import Select from './fields/select';
import Text from './fields/text';
//import Textarea from './fields/textarea';
import Html from './fields/html';
import Image from './fields/image';
import Gallery from './fields/gallery';

//import RangeSlider from './fields/rangeSlider';

const renderImageField = ({
    input,
    placeholder,
    meta: { touched, error }
}) => (
        <Image
            placeholder={placeholder}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />
    )
const renderGalleryField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    lang,
    multilang
}) => (

        <Gallery
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            lang={lang}
            multilang={multilang}
            {...input}
        />
    )

const renderHtmlField = ({
    input,
    placeholder,
    label,
    type,
    meta: { touched, error }
}) => (
        <Html
            placeholder={placeholder}
            label={label}
            type={type}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />
    )

const renderSelectField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    children,
}) => (

        <Select
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            {...input}
            children={children}
        />
    )

const renderTextField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
}) => (

        <Text
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            {...input}
        />
    )
/*
const renderTextareaField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
}) => (

        <Textarea
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            {...input}
        />
    )

const renderRangeSliderField = ({
    input,
    label,
    meta: { touched, error },
    children,
    min, max, defaultValue
}) => (

        <RangeSlider
            label={label}
            errorText={touched && error}
            {...input}
            children={children}
            min={min}
            max={max}
            defaultValue={defaultValue}
        />
    )
*/


const carForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <Row>
                <Col lg="12">
                    <h3>CREATE NEW AD</h3>
                </Col>
                <Col lg="6">

                    <Row>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="make"
                                component={renderTextField}
                                // label={"Make"}
                                placeholder="Make"
                            ></Field>
                            {/* <Field 
                                            type="hidden"
                                            name="csrf"
                                            value={{csrftoken}}
                                        ></Field> */}
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="model"
                                component={renderTextField}
                                // label={"Model"}
                                placeholder="Model"
                            ></Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="productionYear"
                                component={renderTextField}
                                // label={"Production year"}
                                placeholder="Production year"
                            ></Field>
                        </Col>

                        <Col lg="6" className="input-wrap">
                            <Field
                                name="fuel"
                                component={renderSelectField}
                                // label={"Fuel"}
                                placeholder="Fuel"
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
                                // label={"Transmission"}
                                placeholder="Transmission"
                            >
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
                            </Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="class"
                                component={renderSelectField}
                                // label={"Class"}
                                placeholder="Class"
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
                                // label={"Mileage"}
                                placeholder="Mileage"
                            ></Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="limitMileage"
                                component={renderTextField}
                                // label={"Limit Mileage"}
                                placeholder="Limit Mileage"
                            ></Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="power"
                                component={renderTextField}
                                // label={"Power (kW)"}
                                placeholder="Power (kW)"
                            ></Field>
                        </Col>

                        <Col lg="6" className="input-wrap">
                            <Field
                                name="color"
                                component={renderSelectField}
                                // label={"Color"}
                                placeholder="Color"
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
                                // label={"Seat count"}
                                placeholder="Seat count"
                            ></Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="location"
                                component={renderTextField}
                                // label={"Location"}
                                placeholder="Location"
                            ></Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="price"
                                component={renderTextField}
                                // label={"Price"}
                                placeholder="Price"
                            ></Field>
                        </Col>

                        <Col lg="12" className="input-wrap">
                            <Field
                                name="description"
                                component={renderHtmlField}
                                label={"Tekst"}
                                placeholder=""
                            ></Field>
                        </Col>
                    </Row>
                </Col>
                <Col lg="6" className="input-wrap">

                    <Field
                        name="images"
                        component={renderGalleryField}

                    ></Field>
                </Col>

                <Col lg="12">
                    <div className="input-wrap buttons">
                        <button type="submit" className="button" disabled={pristine || submitting}> Save </button>
                    </div>

                </Col>

            </Row>

        </form>

    )
}

export default reduxForm({
    form: 'carForm'  // a unique identifier for this form
})(carForm)
