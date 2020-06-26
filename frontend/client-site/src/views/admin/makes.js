import React, { Component } from 'react';
import { PageWithLayout } from '../../containers/page';
import { connect } from 'react-redux';
import MakeForm from '../../components/forms/makeForm';
import ModelForm from '../../components/forms/modelForm';
import ClassForm from '../../components/forms/classForm';
import FuelForm from '../../components/forms/fuelForm';

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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';

const forms = {
    'make': MakeForm,
    'fuel': FuelForm,
    'class': ClassForm,
    'model': ModelForm
}

const striptags = require('striptags');


class Makes extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);

        this.state = {
            makes: [],
            items: []
        }
    }


    add(data) {
        data.name ? data.name = striptags(data.name) : data.name = "";

        if (this.props[0].match.params.id !== 'new') {
            fetch(`https://localhost:8080/${this.props[0].match.params.type}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push(`/car-attributes/${this.props[0].match.params.type}`))


        } else {
            fetch(`https://localhost:8080/${this.props[0].match.params.type}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }).then((res) => this.props[0].history.push(`/car-attributes/${this.props[0].match.params.type}`))
        }
    }

    get() {
        fetch('https://localhost:8080/make/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                makes: result
            })
        })


        if (this.props[0].match.params.id) {
            fetch(`https://localhost:8080/${this.props[0].match.params.type}/get/${this.props[0].match.params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then((res) => res.json()).then((result) => {
                this.setState({
                    data: result
                })
            });
        }
    }


    getAll() {
        if (!localStorage.token) {
            return;
        }

        fetch(`https://localhost:8080/${this.props[0].match.params.type}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            this.setState({
                items: result
            })
        })

    }

    delete(id) {
        if (!localStorage.token) {
            return;
        }

        fetch(`https://localhost:8080/${this.props[0].match.params.type}/remove/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.getAll())
    }



    componentDidMount() {
        if (this.props[0].match.params.id) {
            this.get();
        } else {
            this.getAll();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props[0].location.pathname != prevProps[0].location.pathname) {
            if (this.props[0].match.params.id) {
                this.setState({
                    data: null
                }, () => {
                    this.get();
                })
            } else {
                this.setState({
                    items: []
                }, () => {
                    this.getAll();
                })
            }
        }


    }


    render() {
        const Form = forms[this.props[0].match.params.type];


        return (
            <div >
                {
                    !localStorage.getItem('token') ? <Redirect to={'/signin'}></Redirect> : null
                }
                <PageHeader {...this.props} />
                <div className="page-wrap">
                    <section className="admin-wrap">
                        <Container>
                            <ul className="admin-tabs">
                                <li className={this.props[0].match.params.type == 'make' ? "active" : null}> <Link to='/car-attributes/make'>Makes</Link></li>
                                <li className={this.props[0].match.params.type == 'model' ? "active" : null}> <Link to='/car-attributes/model'>Models</Link></li>
                                <li className={this.props[0].match.params.type == 'fuel' ? "active" : null}> <Link to='/car-attributes/fuel'>Fuels</Link></li>
                                <li className={this.props[0].match.params.type == 'class' ? "active" : null}> <Link to='/car-attributes/class'>Classes</Link></li>
                            </ul>

                            {!this.props[0].match.params.id ?

                                <Row>
                                    <Col lg="12">

                                        <table>
                                            <tr>
                                                <th>Name</th>
                                                <th>Options</th>
                                            </tr>
                                            {
                                                this.state.items && this.state.items.map((item, idx) => {
                                                    return (
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                <Link to={`/car-attributes/${this.props[0].match.params.type}/${item._id}`}><button><Isvg src={editIcon} /> </button></Link>
                                                                <button onClick={() => this.delete(item._id)}><Isvg src={deleteIcon} /> </button>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }

                                        </table>

                                        <Link to={`/car-attributes/${this.props[0].match.params.type}/new`}> <button className="button add-new">Add</button></Link>
                                    </Col>
                                </Row>
                                :
                                <Form makes={this.state.makes ? this.state.makes : []} onSubmit={this.add} initialValues={this.state.data} />
                            }
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



export default connect(mapStateToProps)(PageWithLayout(Makes));
