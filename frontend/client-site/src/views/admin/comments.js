import React, { Component } from 'react';
import { PageWithLayout } from '../../containers/page';
import { connect } from 'react-redux';
import FilterForm from '../../components/forms/filterForm';
import PageHeader from '../../containers/header/pageHeader';
import Footer from '../../containers/footer';
import { Link, Redirect } from 'react-router-dom';

import Map from '../../components/map';
import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';

class Comments extends Component {
    constructor(props) {
        super(props);
        // this.searchProducts = this.searchProducts.bind(this);
        // this.fetchItems = this.fetchItems.bind(this);
        this.allow = this.allow.bind(this);
        this.disallow = this.disallow.bind(this);
        this.get = this.get.bind(this);
        this.state = {
            items: []
        };
    }



    componentDidMount() {
        this.get();
    }
    get() {
        fetch('https://127.0.0.1:8080/review/getAll', {
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
    allow(id) {
        // if (!localStorage.token) {
        //     return;
        // }




        fetch('https://127.0.0.1:8080/review/allow/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.get())
    }


    disallow(id) {
        // if (!localStorage.token) {
        //     return;
        // }



        fetch('https://127.0.0.1:8080/review/disallow/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.get())
    }



    render() {



        return (
            <div>
                {
                    !localStorage.getItem('token') ? <Redirect to={'/signin'}></Redirect> : null
                }
                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">
                    <Container className="table">
                        <Row className="page-title">
                            <Col lg="12">
                                <h3>COMMENTS</h3>
                            </Col>
                        </Row>
                        <Row className="table-head">
                            <Col lg="2">
                                <span className="name">CAR</span>
                            </Col>
                            <Col lg="1">
                                <span className="name">DATE</span>
                            </Col>
                            <Col lg="1">
                                <span className="name">RATE</span>
                            </Col>
                            <Col lg="3">
                                <span className="name">COMMENT</span>
                            </Col>
                            <Col lg="2">
                                <span className="name">STATUS</span>
                            </Col>
                            <Col lg="3" className="actions">

                                <span className="name">OPTIONS</span>
                            </Col>
                        </Row>
                        {
                            this.state.items && this.state.items.map((item, idx) => {
                                return (

                                    <Row className="table-row" key={idx}>
                                        <Col lg="2">
                                            {
                                                item.car ?
                                                    <span className="value">{item.car.make} {item.car.model} {item.car.productionYear} </span>
                                                :
                                                <span className="value">{item.carId} </span>
                                            }

                                        </Col>
                                        <Col lg="1">
                                            <span className="value">{item.date} </span>
                                        </Col>
                                        <Col lg="1">
                                            <span className="value">{item.rate} </span>
                                        </Col>
                                        <Col lg="3">
                                            <span className="value">{item.comment} </span>
                                        </Col>
                                        <Col lg="2">
                                            <div className={item.status == 2 ? 'valid-reservation' : item.status == 1 ? 'not-valid-reservation' : 'undefined-reservation'}></div>
                                            <span className="value">{item.status == 2 ? 'ODOBRENO' : item.status == 1 ? 'ODBIJENO' : ''}</span>
                                        </Col>
                                        <Col lg="3" className="actions">
                                            {
                                                item.status == 0 ?
                                                    <div className="btns">
                                                        <button className="button-allow" onClick={() => { this.allow(item._id) }}>ODOBRI</button>
                                                        <button className="button-disallow" onClick={() => { this.disallow(item._id) }}>ODBIJ</button>
                                                    </div>
                                                    :
                                                    item.status == 1 ?
                                                        <div className="btns">
                                                            <button className="button-allow" onClick={() => { this.allow(item._id) }}>ODOBRI</button>
                                                        </div>
                                                        :
                                                        <div className="btns">
                                                            <button className="button-disallow" onClick={() => { this.disallow(item._id) }}>ODBIJ</button>
                                                        </div>
                                            }
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Container>


                    {/* <Footer {...this.props} /> */}


                </div>



            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(Comments));
