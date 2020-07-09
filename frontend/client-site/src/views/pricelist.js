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

class Pricelist extends Component{
    constructor(props){
        super(props);
        this.state = {

        };

        this.getMyCart = this.getPricelist.bind(this);
    }

    componentWillMount(){
        this.getMyCart();
    }
    
    getPricelist(){
        fetch(`https://localhost:8080/cars/pricelist/get/${this.props[0].match.params.id}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            const pr = await res.json();
            this.setState({
                id: pr._id,
                pricePerDay: pr.pricePerDay,
                pricePerKM: pr.pricePerKM,
                priceCDWP: pr.priceCDWP,
                sale: pr.sale
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
                                            <th>Id</th>
                                            <th>Price per day</th>
                                            <th>Price over limit/KM</th>
                                            <th>CDWP Price</th>
                                            <th>Sale</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.id}</td>
                                            <td>{this.state.pricePerDay}</td>
                                            <td>{this.state.pricePerKM}</td>
                                            <td>{this.state.priceCDWP}</td>
                                            <td>{this.state.sale}%</td>
                                        </tr>
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


export default Pricelist; 