import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Row,
    Col,
} from 'reactstrap';
import Select from './fields/select';
import Text from './fields/text';
import Textarea from './fields/textarea';
import Html from './fields/html';
import Image from './fields/image';
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
/*


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


const commentForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <Row>
                <Col lg="12">
                    <h3>WRITE COMMENT</h3>
                </Col>
                <Col lg="12">

                    <Row>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="rate"
                                component={renderSelectField}
                                // label={"Comment"}
                                placeholder="Rate"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Field>
                        </Col>

                    </Row>
                    <Row>
                        <Col lg="6" className="input-wrap">
                            <Field
                                name="comment"
                                component={renderTextareaField}
                                // label={"Comment"}
                                placeholder="Write comment here..."
                            ></Field>
                        </Col>
                    </Row>
                </Col>


                <Col lg="12">
                    <div className="input-wrap buttons">
                        <button type="submit" className="button" disabled={pristine || submitting}> SEND COMMENT </button>
                    </div>

                </Col>

            </Row>

        </form>

    )
}

export default reduxForm({
    form: 'commentForm'  // a unique identifier for this form
})(commentForm)
