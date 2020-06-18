import React, { Component } from 'react';
import { PageWithLayout } from '../../containers/page';
import { connect } from 'react-redux';

import PageHeader from '../../containers/header/pageHeader';
import Footer from '../../containers/footer';
import { Link, Redirect } from 'react-router-dom';

import editIcon from '../../assets/svg/edit.svg'
import deleteIcon from '../../assets/svg/delete.svg'
import Isvg from 'react-inlinesvg';
import {
    Container,
    Row,
    Col,
 

} from 'reactstrap';


class Users extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.get();
    }

    async get() {
        // if (!localStorage.token) {
        //     return;
        // }

        const result = await fetch('https://localhost:8080/auth/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (parseInt(result.status) / 100 !== 2) {
            return;
        }

        const json = await result.json();
        console.log(json);
        if (json) {
            this.setState({
                items: json
            })
        }

    }

    allow = (id) => {
        fetch(`https://localhost:8080/auth/users/update/status/${id}/0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => {
            this.get();
        });

    }
    disallow = (id) => {
        fetch(`https://localhost:8080/auth/users/update/status/${id}/1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => {
            this.get();
        });

    }

    delete = (id) => {
        if (!localStorage.token) {
            return;
        }

        fetch('https://127.0.0.1:8080/auth/users/remove/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.get())
    }




    render() {


        return (
            <div >
                {
                    !localStorage.getItem('token') ? <Redirect to={'/signin'}></Redirect> : null
                }
                <PageHeader {...this.props} />
                <div className="page-wrap">
                    <section className="admin-wrap">
                        <Container>

                                <Row>
                                    <Col lg="12">

                                        <table>
                                            <tr>
                                                <th>Name</th>
                                                <th>E-mail</th>
                                                <th>Options</th>
                                            </tr>
                                            {
                                                this.state.items && this.state.items.map((item, idx) => {
                                                    return (
                                                        <tr>
                                                            <td>{item.firstName} {item.lastName}</td>
                                                            <td>{item.email}</td>

                                                            <td>
                                                                {item.status === 1 ?
                                                                    <button className="button button-unblock"  onClick={() => { this.allow(item._id) }}>UNBLOCK</button>
                                                                    :
                                                                    <button className="button button-block" onClick={() => { this.disallow(item._id) }}>BLOCK</button>
                                                                }

                                                                <button onClick={() => this.delete(item._id)}><Isvg src={deleteIcon} /> </button>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }

                                        </table>

                                    </Col>
                                </Row>
                            
                        </Container>
                    </section>
                </div>



            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(Users));
