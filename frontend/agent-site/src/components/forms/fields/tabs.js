
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                {
                    this.props.children.map((children) => {
                        if (children.props.value == 'ankauf')
                        return (
                            <Link to='/ankauf'><div className={this.props.value == children.props.value ? 'btab active' : 'btab'}>{children.props.children}</div></Link>
                        )

                        else 
                        return (
                            <div className={this.props.value == children.props.value ? 'btab active' : 'btab'} onClick={() => this.props.onChange(children.props.value)}>{children.props.children}</div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Tabs;