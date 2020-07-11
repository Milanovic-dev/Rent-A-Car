import React from 'react';
import { Field, reduxForm } from 'redux-form'
import Text from './fields/text';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import DateTime from './fields/datePicker';
import Select from './fields/select';
import RangeSlider from './fields/rangeSlider';
import Tabs from './fields/tabs';

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


const renderTabsField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    children,
}) => (

        <Tabs
            {...input}
            children={children}
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


let SearchForm = (props) => {
    const { handleSubmit, reset, productFilters } = props;

    return (
        <Container className={props.searchForm ? "search-form" : "search-form hide-mobile"}>
            <h3>LET'S FIND PERFECT CAR FOR YOU!</h3>
            <i className="mdi mdi-close hide-desktop" onClick={() => props.handleMobileSearchForm(null)}></i>
            <form onSubmit={handleSubmit} className="contact-form">
                <Row>
                    <Col lg="10" xs="12" className="tabs">
                        <Field
                            name="condition"
                            component={renderTabsField}
                        >
                            <option value="all">Extended Search</option>
                            <option value="all">EN</option>
                        </Field>
                    </Col>
                    
                </Row>
                <div className="form-wrap">
                    <Row >
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="takePoint"
                                    component={renderTextField}
                                    placeholder="Start place"
                                    label="Pick a place where you what to pick up your vehicle"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="takeDate"
                                    component={renderDateTimeField}
                                    label="Choose a date and time to pick up your vehicle"
                                />
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="returnDate"
                                    component={renderDateTimeField}
                                    label="Choose a date and time to return your vehicle"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="make"
                                    component={renderSelectField}
                                    label="Choose a make"
                                    placeholder="- Choose a make -"
                                >
                                {
                                    productFilters && productFilters.makes.map((item, idx) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })
                                }
                                </Field>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="model"
                                    component={renderSelectField}
                                    label="Choose a model"
                                    placeholder="- Choose a model -"
                                >
                                    {
                                        productFilters && productFilters.models.map((item, idx) => {
                                            return (
                                                <option value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="class"
                                    component={renderSelectField}
                                    label="Choose a class"
                                    placeholder="- Choose a class -"
                                >
                                    {
                                    productFilters && productFilters.classes && productFilters.classes.map((item, idx) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })
                                }
                                </Field>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="fuel"
                                    component={renderSelectField}
                                    label="Choose a fuel type"
                                    placeholder="- Choose fuel -"
                                >
                                    {
                                    productFilters && productFilters.fuels && productFilters.fuels.map((item, idx) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })
                                }
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>               
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="transmission"
                                    component={renderSelectField}
                                    label="Choose a transmission"
                                    placeholder="- Choose a transmission -"
                                >
                                    <option value={undefined}>None</option>
                                    <option value="manual">Manual</option>
                                    <option value="automatic">Automatic</option>
                                </Field>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="mileage"
                                    component={renderTextField}
                                    label="Choose a mileage"
                                    placeholder="- Choose a mileage -"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>               
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="lowestPrice"
                                    component={renderTextField}
                                    label="Choose a price (FROM)"
                                    placeholder="- From price -"
                                />
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="highestPrice"
                                    component={renderTextField}
                                    label="Choose a price (TO)"
                                    placeholder="- To price -"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>               
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="desiredMileage"
                                    component={renderTextField}
                                    label="Desired KM"
                                    placeholder="- KM to go -"
                                />
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="cdwp"
                                    component={renderSelectField}
                                    label="With CDWP"
                                    placeholder="- Choose CDWP -"
                                >
                                    <option value={undefined}>None</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>               
                        <Col lg="4">
                            <div className="input-wrap">
                                <Field
                                    name="seatCount"
                                    component={renderTextField}
                                    label="Seat Count"
                                    placeholder="- Choose seat count -"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="8">
                            <div className="input-wrap buttons">
                                <button type="button" className="button clear-btn" onClick={reset}>Reset</button>
                                <button type="submit" className="button black-btn right-chevron" >Search</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </form>
        </Container>

    )
}

SearchForm = reduxForm({
    form: 'searchForm', // a unique identifier for this form,
    initialValues: { condition: 'all' }
})(SearchForm)


export default SearchForm
