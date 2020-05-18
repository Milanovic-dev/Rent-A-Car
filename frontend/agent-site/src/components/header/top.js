import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeLanguage} from '../../actions/index';
import langs from '../../constants/langs';

import {
    Row,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: null
        };
    }

    render() {
        console.log(this.props);

        return (
            <Row className="top">
                <Col md="2">
                    <Dropdown inNavbar isOpen={this.state.dropdownOpen} toggle={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }}>
                        <DropdownToggle tag="span" caret>
                            {langs[this.props.lang].name}
                        </DropdownToggle>

                        <DropdownMenu>
                            {
                                Object.values(langs).map((lang) => {
                                    return (
                                        <DropdownItem onClick={() => this.props.handleChange(lang.id)}>{lang.name}</DropdownItem>
                                    )
                                })
                            }

                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col md={{ size: 4, offset: 6 }}>
                    MON - SAT 8.00 - 18.00
        </Col>
            </Row>
        )
    }
}
const mapStateToProps = state => ({
    lang: state.language,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(dispatch);
    return {
        handleChange: (lang) => {
            dispatch(changeLanguage(lang))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top);
