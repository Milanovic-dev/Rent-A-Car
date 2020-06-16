import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {renderTextField } from './fields/renderFields';

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
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col lg="12" >
                        <Container fluid className="form-box">
                            <Row>
                                <Col lg="12">
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="firstName"
                                            component={renderTextField}
                                            label={"First name"}
                                            disabled
                                        ></Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="lastName"
                                            component={renderTextField}
                                            label={"Last name"}
                                            disabled
                                        ></Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="email"
                                            component={renderTextField}
                                            label={"E-mail"}
                                            disabled
                                        ></Field>
                                    </Col>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </form>
        )
    }
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
