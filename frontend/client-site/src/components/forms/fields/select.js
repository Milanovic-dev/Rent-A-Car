import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        if(!this.props.children ){
            return null;
        }
        return (
            <div>
                <Dropdown className="select-field" isOpen={this.state.dropdownOpen} toggle={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }}>
                    <DropdownToggle nav caret>
                        {
                            this.props.value ? this.props.children.find(o => o.props.value === this.props.value).props.children : this.props.placeholder
                        }
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-animation">
                        {
                            this.props.children && this.props.children.map((children) => {
                                if (children && children.props)
                                return (
                                    <DropdownItem onClick={() => this.props.onChange(children.props.value)}>{children.props.children}</DropdownItem>
                                )
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
                <label>{this.props.label}</label>
            </div>
        );
    }
}

export default Select;