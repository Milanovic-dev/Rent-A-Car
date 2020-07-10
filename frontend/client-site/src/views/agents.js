import React, { Component } from 'react';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Form from '../components/forms/cartForm';


import {
    Container,
    Row,
    Col,
    CarouselItem,
    Table
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Agents extends Component{
    constructor(props){
        super(props);
        this.state = {

        };

        this.getMyCart = this.getAgents.bind(this);
    }

    componentWillMount(){
        this.getMyCart();
    }
    
    getAgents(){
        fetch(`https://localhost:8080/webhook/agents`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            const agents = await res.json();
            this.setState({
                data: agents
            })
        }).catch(err => console.error(err));
    }


    render() {
        return (
            <>
                <PageHeader {...this.props} />
                <div className="page-wrap">
                <Container>
                        <Row>
                            <Col lg="12" className="reg">
                                <Table style={{ marginBottom: '200px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{color:'white', fontWeight:400, backgroundColor: '#DA212E' }}>Id</th>
                                            <th style={{color:'white', fontWeight:400, backgroundColor: '#DA212E' }}>Company name</th>
                                            <th style={{color:'white', fontWeight:400, backgroundColor: '#DA212E' }}>Username</th>
                                            <th style={{color:'white', fontWeight:400, backgroundColor: '#DA212E' }}>Secret</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.data ? this.state.data.map((item, i) => {
                                        return (<tr>
                                            <td>{item._id}</td>
                                            <td>{item.companyName}</td>
                                            <td>{item.username}</td>
                                            <td>{item.password}</td>
                                        </tr>)
                                    }) : null}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer {...this.props} />
            </>
        );
    }

}


export default Agents; 