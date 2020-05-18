import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';
import ReactPaginate from 'react-paginate';

import FilterForm from '../components/forms/filterForm';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';
import JobForm from '../components/forms/jobForm';

import Map from '../components/map';

import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselControl,
    CarouselItem,

} from 'reactstrap';


class DynamicPage extends Component {
    constructor(props) {
        super(props);
        this.apply = this.apply.bind(this);

        this.state = {
            jobs: []
        };
    }



    componentWillMount() {
        document.title = 'SHOWROOM DAS AUTOHAUS'
    }


    componentDidMount(){
        fetch('https://showroom-api.novamedia.agency/jobs').then((res) => res.json()).then((jobs) => { console.log(jobs); this.setState({ jobs }); })

    }

    apply(data) {
        this.setState({
            _loading: true
        })
    }

    render() {


        return (

            <div className={this.props.menu ? "solutions-wrap active-menu-animation" : "solutions-wrap"}>

                <PageHeader page={this.props.pages && this.props.pages[this.props[0].match.params.alias] && this.props.pages[this.props[0].match.params.alias].title} {...this.props} />
                <div className="page-wrap">

                    <section className="section solutions-section">
                        <Container >
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>{this.props.pages && this.props.pages[this.props[0].match.params.alias] && this.props.pages[this.props[0].match.params.alias].title}</h2>
                                        <p>{this.props.pages && this.props.pages[this.props[0].match.params.alias] && this.props.pages[this.props[0].match.params.alias].subtitle}</p>
                                    </div>
                                </Col>
                            </Row>
                            {this.props[0].location.pathname.indexOf('karriere') !== -1 ?
                                <Row>
                                    {
                                        this.state.jobs.map((item, idx) => {
                                            return (
                                                <Col lg="4" className="job-box">
                                                <div>
                                                    <img src={item.image} />
                                                    <h6>{item.name}</h6>
                                                    <div dangerouslySetInnerHTML={{__html: item.content && item.content.replace(/&shy;/g, '')}}></div>
                                                </div>
                                            </Col>
        
                                            )
                                        })
                                    }
                                    <Col lg="12">
    <JobForm done={this.state._done} loading={this.state._loading} onSubmit={this.apply}/>
</Col>
                                </Row>

                                :

                                null
                            }

                            <Row>
                                <Col lg="12" className="dynamic-page-content" dangerouslySetInnerHTML={{ __html: this.props.pages && this.props.pages[this.props[0].match.params.alias] && this.props.pages[this.props[0].match.params.alias].content }}>

                                </Col>
                            </Row>
                        </Container>
                    </section>
                    {this.props.infoblock && this.props.infoblock.length == 4 ?
                        <section className="section services-section">

                            <Container>
                                <Row>
                                    <Col md="12">
                                        <div className="sub-title text-center">
                                            <h2>{this.props.config && this.props.config.infoBlockTitle}</h2>
                                        </div>
                                    </Col>

                                    <Col md="3" xs="6">
                                        <article>
                                            <img src={this.props.infoblock[0].image} />
                                            <h3>{this.props.infoblock[0].name}</h3>
                                        </article>
                                    </Col>

                                    <Col md="3" xs="6">
                                        <article>
                                            <img src={this.props.infoblock[1].image} />
                                            <h3>{this.props.infoblock[1].name}</h3>
                                        </article>
                                    </Col>

                                    <Col md="3" xs="6">
                                        <article>
                                            <img src={this.props.infoblock[2].image} />
                                            <h3>{this.props.infoblock[2].name}</h3>
                                        </article>
                                    </Col>

                                    <Col md="3" xs="6">
                                        <article>
                                            <img src={this.props.infoblock[3].image} />
                                            <h3>{this.props.infoblock[3].name}</h3>
                                        </article>
                                    </Col>

                                </Row>
                            </Container>
                        </section>
                        :
                        null
                    }


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



export default connect(mapStateToProps)(PageWithLayout(DynamicPage));
