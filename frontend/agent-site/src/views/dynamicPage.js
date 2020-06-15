import React, { Component } from 'react';
import Link from '../components/link';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';


import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    UncontrolledDropdown
} from 'reactstrap';



import rightChevron from '../assets/svg/right-chevron.svg';
import bg from '../assets/images/page-bg.png';
import Map from '../components/map';


class DynamicPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };


    }


    componentDidMount() {

        if (typeof window !== 'undefined') {window.scrollTo(0, 0);}


    }

    componentDidUpdate(prevProps){
        if (typeof window !== 'undefined') {
            if (this.props[0].location.pathname != prevProps[0].location.pathname){
                window.scrollTo(0, 0);
            }

        }

    }

    render() {


        let data = null;
        for(let i=0;i<this.props.pages.length;i++){
            if ( this.props.pages[i].alias == this.props[0].match.params.alias ){
                data = this.props.pages[i];
            }
        }

        return (
            <div className="page-wrap">
<div className="into-wrap">
                    <div className="background-image"><img src={bg} /></div>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <h6>INTRODUCING THE</h6>
                                <h1>{data && data.name}</h1>
                            </Col>
                            <Col lg="6" className="bcrumb">
                                <ul>
                                    <li> <Link to='/'>STARTSEITE</Link> </li>
                                    <li> <Link to={'/page/'+(data && data.name && data.name.generateAlias())}>{data && data.name}</Link> </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <section className="content-section">
                <Container>
                    <Row>
                        {
                            data && data.content && data.content.map((item, idx) => {
                                return (
                                    <Col lg={item.width.desktop} xs={item.width.mobile} className="item">
                                        {
                                            item.type == 'html' ?
                                                <div dangerouslySetInnerHTML={{__html: item.value}}></div>
                                            :

                                            <img src={item.value} />
                                        }
                                    </Col>    
                                )
                            })
                        }
                    </Row>
                    </Container>
                </section>
                <section className="map-section">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <Map {...this.props}/>
                            </Col>
                        </Row>
                    </Container>
                </section>

            </div>
        );
    }
}

export default Page(DynamicPage);