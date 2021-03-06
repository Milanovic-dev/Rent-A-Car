import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

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
import DateTime from './fields/datePicker';
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

export const renderDateTimeField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
}) => (

        <DateTime
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}

            {...input}
        />
    )

let SelectingFormValuesForm = (props) => {
    const { handleSubmit, pristine, submitting, fuel, make, model, classes} = props;
    console.log(pristine, submitting);
    console.log(props.makes);
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
                                component={renderSelectField}
                                // label={"Make"}
                                placeholder="Make"
                            >
                                {make ? make.map((item, i) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>

                                    )
                                }) : null}
                            </Field>
                            
                            {/* <Field 
                                            type="hidden"
                                            name="csrf"
                                            value={{csrftoken}}
                                        ></Field> */}
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="model"
                                component={renderSelectField}
                                // label={"Model"}
                                placeholder="Model"
                            >
                                {model ? model.map((item, i) => {
                                    {
                                        if(props.makes == item.makeName){
                                            return (
                                                <option value={item.name}>{item.name}</option>
        
                                            )
                                        }
                                    }
                                   
                                }) : null}
                            </Field>
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

                                {fuel ? fuel.map((item, i) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>

                                    )
                                }) : null}
                                {/* <option value="diesel">Diesel</option>
                                <option value="gasoline">Gasoline</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="electric">Electric</option> */}
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
                                {classes ? classes.map((item, i) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>

                                    )
                                }) : null}
                                {/* <option value="cabriolet-roadster">Cabriolet / Roadster</option>

                                <option value="estate-car">Estate Car</option>

                                <option value="saloon">Saloon</option>

                                <option value="small-car">Small Car</option>

                                <option value="sports-car-coupe">Sports Car / Coupe</option>

                                <option value="suv-off-road-vehicle-pickup-truck">SUV / Off-road Vehicle / Pickup Truck</option>

                                <option value="van-minibus">Van / Minibus</option> */}



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
                                name="pricelist.pricePerDay"
                                component={renderTextField}
                                // label={"Price"}
                                placeholder="Price per day"
                            ></Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="pricelist.pricePerKM"
                                component={renderTextField}
                                // label={"Price"}
                                placeholder="Price per km"
                            ></Field>
                        </Col>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="cdwp"
                                component={renderSelectField}
                                placeholder="Cdwp"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Field>
                        </Col>
                        <Col lg="12" className="input-wrap">
                            <Field
                                name="from"
                                component={renderDateTimeField}
                            >
                            </Field>
                        </Col>
                        <Col lg="12" className="input-wrap">
                            <Field
                                name="to"
                                component={renderDateTimeField}
                            >
                            </Field>
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

// The order of the decoration does not matter.

// Decorate with redux-form
SelectingFormValuesForm = reduxForm({
    form: 'selectingFormValues' // a unique identifier for this form
  })(SelectingFormValuesForm)
  
  // Decorate with connect to read form values
  const selector = formValueSelector('selectingFormValues') // <-- same as form name
  SelectingFormValuesForm = connect(state => {
    // can select values individually
    const makes = selector(state, 'make')
    // or together as a group
    return {
        makes,
    }
  })(SelectingFormValuesForm)
  
  export default SelectingFormValuesForm
