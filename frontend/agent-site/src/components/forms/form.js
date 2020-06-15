import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import Text from './fields/text';
import Textarea from './fields/textarea';
import Select from './fields/select';
import Option from './fields/option';

import rightChevron from '../../assets/svg/right-chevron.svg';
import Isvg from 'react-inlinesvg';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';


import cars from '../../cars';

const required = value => value ? undefined : "Required"

const renderTextField = ({
    input,
    placeholder,
    meta: { touched, error },
}) => (

        <Text
            placeholder={placeholder}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />
    )
const renderSelectField = ({
    input,
    placeholder,
    children,
    meta: { touched, error },
}) => (

        <Select
            placeholder={placeholder}
            errorText={touched && error}
            error={touched && error}
            {...input}
        >{children}</Select>
    )
const renderOptionField = ({
    input,
    label,
    meta: { touched, error },
}) => (

        <Option
            label={label}
            errorText={touched && error}
            error={touched && error}
            {...input}
        ></Option>
    )


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
            error={touched && error}
            {...input}
        />
    )


class form extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            step: 0
        }
    }

    submit(data) {
        console.log(data);


        fetch('https://api.trans-fair.eu/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(
                data
            )
        }).then((res) => res.json()).then((result) => {
            this.setState({
                _done: true
            })
        })


    }
    //Schaltgetriebe
    //Allrad Schaltgetriebe
    //Automatik
    //Allrad Automatik

    render() {
        console.log(this.props.make);

        const { handleSubmit, pristine, reset, submitting } = this.props;
        console.log(pristine, submitting);


        let models = [];

        for (let i = 0; i < cars.length; i++) {
            if (cars[i].name == this.props.make) {
                models = cars[i].models;
            }
        }

        let years = [];
        for (let i = new Date().getFullYear(); i >= 1960; i--) {
            years.push(i);
        }

        return (
            <form onSubmit={handleSubmit} className="home-form">
                <ul>
                    <li className={this.state.step == 0 ? 'active' : null}><button type="button" >1. FAHRZEUG</button></li>
                    <li className={this.state.step == 1 ? 'active' : null}><button type="button" >2. DATEN</button></li>
                    <li className={this.state.step == 2 ? 'active' : null}><button type="button" >3. KONTAKT</button></li>

                </ul>
                <div className="form-wrap">

                    {this.state.step == 0 ?
                        <Row>
                            <Col lg="6">
                                <Field
                                    name="make"
                                    component={renderSelectField}
                                    validate={[required]}
                                    placeholder="Automarke Wählen"

                                >
                                    {
                                        cars.map((item, idx) => {
                                            return (
                                                <option value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </Col>
                            <Col lg="6">
                                {models.length ?
                                    <Field
                                        name="model"
                                        component={renderSelectField}
                                        placeholder="Modell"

                                    >
                                        {
                                            models.map((item, idx) => {
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })
                                        }

                                    </Field>

                                    :
                                    null
                                }
                            </Col>
                            <Col lg="6">
                                <Field
                                    name="year"
                                    component={renderSelectField}
                                    validate={[required]}
                                    placeholder="Bitte Baujahr Wählen"

                                >
                                    {
                                        years.map((item, idx) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </Col>
                            <Col lg="6">
                                <Field
                                    name="mileage"
                                    component={renderTextField}
                                    validate={[required]}
                                    placeholder="Kilometerstand angeben"

                                >
                                </Field>
                            </Col>
                            <Col lg="12">
                                <button onClick={() => { if (this.props.make && this.props.year && this.props.mileage) this.setState({ step: 1 }) }} className={this.props.make && this.props.year && this.props.mileage ? 'button' : 'button button-disabled'}>WEITER <Isvg src={rightChevron} />


                                </button>
                            </Col>
                        </Row>
                        :
                        null
                    }

                    {this.state.step == 1 ?
                        <Row>
                            <Col lg="6">
                                <Field
                                    name="fuel"
                                    component={renderSelectField}
                                    validate={[required]}
                                    placeholder="Kraftstoff Auswählen"

                                >
                                    <option value={'Benzin'}>Benzin</option>
                                    <option value={'Diesel'}>Diesel</option>
                                    <option value={'Elektro'}>Elektro</option>
                                    <option value={'Hybrid (Benzin/Elektro)'}>Hybrid (Benzin/Elektro) </option>
                                    <option value={'Hybrid (Diesel/Elektro)'}>Hybrid (Diesel/Elektro) </option>
                                    <option value={'Autogas (LPG)'}>Autogas (LPG) </option>
                                    <option value={'Erdgas (CNG)'}>Erdgas (CNG) </option>
                                    <option value={'Wasserstoff'}>Wasserstoff </option>
                                    <option value={'Andere'}>Andere </option>

                                </Field>
                            </Col>
                            <Col lg="6">
                                <Field
                                    name="transmission"
                                    component={renderSelectField}
                                    validate={[required]}
                                    placeholder="Getriebe"

                                >
                                    <option value={'Schaltgetriebe'}>Schaltgetriebe</option>
                                    <option value={'Halbautomatik'}>Halbautomatik</option>
                                    <option value={'Automatik'}>Automatik</option>
                                </Field>
                            </Col>
                            <Col lg="6">
                                <Field
                                    name="doors"
                                    component={renderSelectField}
                                    validate={[required]}
                                    placeholder="Anzahl der Turen"

                                >
                                    <option value={'2/3'}>2/3</option>
                                    <option value={'4/5'}>4/5</option>
                                    <option value={'6/7'}>6/7</option>
                                </Field>
                            </Col>
                            <Col lg="6" className="options-col"> 
                                <Field
                                    name="damaged"
                                    component={renderOptionField}
                                    validate={[required]}
                                    label="UNFALLFAHRZEUG"

                                >
                                </Field>
                            </Col>

                            <Col lg="12">
                                <button onClick={() => { if (this.props.fuel && this.props.transmission && this.props.doors) this.setState({ step: 2 }) }} className={this.props.fuel && this.props.transmission && this.props.doors ? 'button' : 'button button-disabled'}>WEITER <Isvg src={rightChevron} /></button>
                            </Col>
                        </Row>
                        :
                        null
                    }

                    {this.state.step == 2 ?
                        this.props.done ?
                            <Row>
                                <Col lg="12" className="done-wrap">
                                    <div className="check">

                                    </div>
                                    <p>Die Anfrage wurde erfolgreich gesendet, erwarte bald eine Antwort.</p>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col lg="6">
                                    <Field
                                        name="sex"
                                        component={renderSelectField}
                                        validate={[required]}
                                        placeholder="Anrede"

                                    >
                                        <option value={'Herr'}>Herr</option>
                                        <option value={'Frau'}>Frau</option>
                                    </Field>
                                </Col>
                                <Col lg="6">
                                    <Field
                                        name="name"
                                        component={renderTextField}
                                        validate={[required]}
                                        placeholder="Name"

                                    >
                                    </Field>
                                </Col>
                                <Col lg="6">
                                    <Field
                                        name="email"
                                        component={renderTextField}
                                        validate={[required]}
                                        placeholder="Email"

                                    >
                                    </Field>
                                </Col>
                                <Col lg="6">
                                    <Field
                                        name="phone"
                                        component={renderTextField}
                                        validate={[required]}
                                        placeholder="Telefon"

                                    >
                                    </Field>
                                </Col>
                                <Col lg="12">
                                    <Field
                                        name="message"
                                        component={renderTextareaField}
                                        validate={[required]}
                                        placeholder="Zusatz Informationen sowie Besonderheiten..."

                                    >
                                    </Field>
                                </Col>
                                <Col lg="12">
                                    <button disabled={this.props.sex && this.props.name && this.props.email && this.props.phone ? false : true} className={this.props.sex && this.props.name && this.props.email && this.props.phone ? 'button' : 'button button-disabled'}>KOSTENLOSES ANGEBOT EINHOLEN {


                                        this.props.loading ?
                                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                            :
                                            null
                                    }
                                        {
                                            !this.props.loading && !this.props.done ?
                                                <Isvg src={rightChevron} />
                                                :
                                                null

                                        }


                                    </button>
                                </Col>
                            </Row>
                        :
                        null
                    }


                </div>
            </form>
        )
    }
}

form = reduxForm({
    form: 'form' // a unique identifier for this form
})(form)

// Decorate with connect to read form values
const selector = formValueSelector('form') // <-- same as form name
form = connect(state => {
    return {
        make: selector(state, 'make'),
        year: selector(state, 'year'),
        mileage: selector(state, 'mileage'),
        fuel: selector(state, 'fuel'),
        transmission: selector(state, 'transmission'),
        doors: selector(state, 'doors'),
        sex: selector(state, 'sex'),
        name: selector(state, 'name'),
        email: selector(state, 'email'),
        phone: selector(state, 'phone'),

    }
})(form)

export default form
