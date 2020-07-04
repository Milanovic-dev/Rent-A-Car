import React, { Component } from 'react';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';
import FilterForm from '../components/forms/filterForm';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import Map from '../components/map';
import Article from '../components/article';
import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';

class InventoryPage extends Component {
    constructor(props) {
        super(props);
        // this.searchProducts = this.searchProducts.bind(this);
        // this.fetchItems = this.fetchItems.bind(this);
        this.state = {
            products: [],
            productFilters: {},
            manufacturerModels: [],
            filters: { sort: 1 },
            items: []
        };
    }

    

    componentDidMount() {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const sort = urlParams.get('sort')
        console.log(sort);
        fetch(`https://localhost:8080/cars/${sort}`, {
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



    render() {

        let sort = [
            'Newer ads',
            'Oldest ads',
            'Highest price',
            'Lowest price',
            'Highest rate',
            'Lowest rate',
            'Highest km',
            'Lowest km'
        ]

        return (
            <div className={this.props.menu ? "inventory-wrap active-menu-animation" : "inventory-wrap"}>
                <PageHeader page='Offers' {...this.props} />
                <div className="page-wrap">
                    <Container>
                        <Row>
                            <Col md="3">
                                {this.state.productFilters && <FilterForm onSubmit={(filters) => { this.searchProducts(filters) }} productFilters={this.state.productFilters} initialValues={this.state.filters} />}
                            </Col>
                            <Col md="9">
                                <div className="top">
                                    <h3><span className="text-primary">{this.state.total}</span> Available vehicles</h3>
                                    <div className="sort">
                                        <span>Sort by</span>
                                        <Dropdown className="select-field" isOpen={this.state.dropdownOpen} toggle={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }}>
                                            <DropdownToggle nav caret>
                                                {
                                                    sort[this.state.filters.sort ? this.state.filters.sort : 0]
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-animation">
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 2;
                                                    this.props[0].history.push(`/ads?sort=2`)
                                                }}>From lower to higher price</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 3;
                                                    this.props[0].history.push(`/ads?sort=3`)

                                                }}>From higher to lower price</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 4;
                                                    this.props[0].history.push(`/ads?sort=4`)

                                                }}>From higher to lower rate</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 5;
                                                    this.props[0].history.push(`/ads?sort=5`)

                                                }}>From lower to higher rate</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 6;
                                                    this.props[0].history.push(`/ads?sort=6`)

                                                }}>From higher to lower km</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 7;
                                                    this.props[0].history.push(`/ads?sort=7`)

                                                }}>From lower to higher km</DropdownItem>

                                                
                                            </DropdownMenu>
                                        </Dropdown>
                                        {/* <div className="btn">
                                        <Isvg src={grid_icon} />
                                    </div>
                                    <div className="btn">
                                        <Isvg src={list_icon} />
                                    </div>*/
                                        }
                                    </div>
                                </div>

                                <Row className="articles">
                                    {
                                        this.state.items.map((product) => {
                                            return (
                                                <Col md="4" xs="6">

                                                    <Article
                                                        title={product.make + " " + product.model}
                                                        // alias={product.alias}
                                                        id={product._id}
                                                        // image={product.images[0]}
                                                        fuel={product.fuel}
                                                        mileage={product.mileage}
                                                        year={product.productionYear}
                                                        price={product.price}
                                                        history = {this.props[0].history}
                                                        images={product.images}
                                                        userCar={product.userCar}
                                                        from={product.from}
                                                        to={product.to}
                                                        fromFormatted={product.fromFormatted}
                                                        toFormatted={product.toFormatted}
                                                    />
                                                </Col>
                                            )
                                        })
                                    }

                                </Row>
                            </Col>
                        </Row>
                    </Container>

                    <section className="section map-section">
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Map {...this.props} />
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <Footer {...this.props} />


                </div>



            </div >
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});



export default connect(mapStateToProps)(PageWithLayout(InventoryPage));
