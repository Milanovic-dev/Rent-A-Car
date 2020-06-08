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
        this.searchProducts = this.searchProducts.bind(this);
        this.fetchItems = this.fetchItems.bind(this);
        this.state = {
            products: [],
            productFilters: null,
            manufacturerModels: [],
            filters: { sort: 1 }
        };
    }

    fetchItems() {
        fetch('https://showroom-api.novamedia.agency/cars/search', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(this.state.filters) }).then((res) => res.json()).then((result) => {
            this.setState({ products: result.items, total: result.total }, () => {
            });

        })

    }

    componentWillMount() {
        document.title = "Fahrzeuge - SHOWROOM DAS AUTOHAUS";
    }

    componentDidMount() {
        fetch('https://showroom-api.novamedia.agency/cars/latest').then((res) => res.json()).then((newestProducts) => { console.log(newestProducts); this.setState({ newestProducts }); })
        fetch('https://showroom-api.novamedia.agency/cars/filters').then((res) => res.json()).then((productFilters) => { console.log(productFilters); this.setState({ productFilters }); })

        if (this.props[0].match.params.searchQuery) {
            this.setState({
                filters: JSON.parse(atob(decodeURIComponent(this.props[0].match.params.searchQuery)))
            }, () => {
                this.fetchItems()
            })
        } else {
            this.fetchItems();
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps[0].location.pathname != this.props[0].location.pathname) {
            if (this.props[0].match.params.searchQuery) {
                this.setState({
                    filters: JSON.parse(atob(decodeURIComponent(this.props[0].match.params.searchQuery)))
                }, () => {
                    this.fetchItems()
                })
            }

        }
    }
    searchProducts(data) {
        this.props[0].history.push(`/fahrzeuge/${encodeURIComponent(btoa(JSON.stringify(data)))}`)
    }
    render() {

        let sort = [
            'Neueste aufsteigend',
            'Neueste absteigend',
            'Preis aufsteigend',
            'Preis absteigend'
        ]

        return (
            <div className={this.props.menu ? "inventory-wrap active-menu-animation" : "inventory-wrap"}>
                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">
                    <Container>
                        <Row>
                            <Col md="3">
                                {this.state.productFilters && <FilterForm onSubmit={(filters) => { this.searchProducts(filters) }} productFilters={this.state.productFilters} initialValues={this.state.filters} />}
                            </Col>
                            <Col md="9">
                                <div className="top">
                                    <h3><span className="text-primary">{this.state.total}</span> VERFÜGBARE FAHRZEUGE</h3>
                                    <div className="sort">
                                        <span>SORTIEREN NACH</span>
                                        <Dropdown className="select-field" isOpen={this.state.dropdownOpen} toggle={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }}>
                                            <DropdownToggle nav caret>
                                                {
                                                    sort[this.state.filters.sort ? this.state.filters.sort : 0]
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-animation">
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 0;
                                                    this.props[0].history.push(`/fahrzeuge/${encodeURIComponent(btoa(JSON.stringify(filters)))}`)

                                                }}>Neueste aufsteigend</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 1;
                                                    this.props[0].history.push(`/fahrzeuge/${encodeURIComponent(btoa(JSON.stringify(filters)))}`)

                                                }}>Neueste absteigend</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 2;
                                                    this.props[0].history.push(`/fahrzeuge/${encodeURIComponent(btoa(JSON.stringify(filters)))}`)

                                                }}>Preis aufsteigend</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    let filters = this.state.filters;
                                                    filters.sort = 3;
                                                    this.props[0].history.push(`/fahrzeuge/${encodeURIComponent(btoa(JSON.stringify(filters)))}`)

                                                }}>Preis absteigend</DropdownItem>
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
                                        this.state.products.map((product) => {
                                            return (
                                                <Col md="4" xs="6">

                                                    <Article
                                                        title={product.title}
                                                        alias={product.alias}
                                                        id={product._id}
                                                        image={'https://showroom-api.novamedia.agency/' + product.images[0]}
                                                        fuel={product.attributes && product.attributes['fuel'] && product.attributes['fuel'].value}
                                                        mileage={product.attributes && product.attributes['mileage'] && product.attributes['mileage'].value}
                                                        year={product.attributes && product.attributes['firstRegistration'] && product.attributes['firstRegistration'].value}
                                                        price={product.price && product.price.grs.localized}
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
