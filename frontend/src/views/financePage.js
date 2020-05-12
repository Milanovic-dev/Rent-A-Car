import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PageWithLayout } from '../containers/page';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';
import ReactPaginate from 'react-paginate';

import FilterForm from '../components/forms/filterForm';
import PageHeader from '../containers/header/pageHeader';
import Footer from '../containers/footer';

import finance1 from '../assets/images/finance1.png';
import finance2 from '../assets/images/finance2.png';
import finance3 from '../assets/images/finance3.png';

import Map from '../components/map';

import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselControl,
    CarouselItem,

} from 'reactstrap';


class FinancePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0
        };
    }



    componentWillMount() {
        document.title = 'SHOWROOM DAS AUTOHAUS'
    }

    render() {


        return (

            <div className={this.props.menu ? "solutions-wrap active-menu-animation" : "solutions-wrap"}>

                <PageHeader page="Finanzierung" {...this.props} />
                <div className="page-wrap">

                    <section className="section solutions-section">
                        <Container >
                            <Row>
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>FINANZIERUNGSPRODUKTE</h2>
                                        <p>Wir bieten Ihnen eine Vielzahl von interessanten Finanzierungsmodellen, die sich perfekt an Ihre Bedürfnisse anpassen.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" className="job-box finance-box">
                                    <div>
                                        <img src={finance1} />
                                        <h6>Günstige Ratenkredite für Ihr Wunschauto</h6>
                                        <div>
                                            <p>
                                                Attraktiv ist diese Finanzierungsform
                                                für Sie vor allem aus 3 Gründen:
                                                Besonders günstige Konditionen,
                                                flexible Laufzeiten und schlanke
                                                Monatsraten. Für Sie bedeutet das:
                                                Hohe Planungssicherheit.</p>
                                            <ul>
                                                <li>Günstige Konditionen</li>
                                                <li>Flexible Laufzeiten</li>
                                                <li>Schlanke Monatsraten</li>
                                            </ul>


                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4" className="job-box finance-box">
                                    <div>
                                        <img src={finance2} />
                                        <h6>Kleine Raten, große
Entscheidungsfreiheit</h6>
                                        <div>
                                            <p>
                                                Niedrige Monatsraten und hohe
    Entscheidungsfreiheit: Bei Vertragsende
    können Sie das Fahrzeug an uns
    zurückgeben, die Schlussrate zu
    Top-Konditionen weiterfinanzieren
    oder bar bezahlen. Die Vorteile aus
    Finanzierung und Leasing perfekt
    kombiniert – für Neu- und
    Gebrauchtwagen.
</p>
                                            <ul>
                                                <li>Niedrige Monatsraten</li>
                                                <li>Hohe Entscheidungsfreiheit</li>
                                                <li>3 Optionen bei Vertragsende</li>
                                            </ul>


                                        </div>
                                    </div>
                                </Col>

                                <Col lg="4" className="job-box finance-box">
                                    <div>
                                        <img src={finance3} />
                                        <h6>So flexibel. So entspannt.</h6>
                                        <div>
                                            <p>
                                                Flexibles Finanzierungsprodukt mit
    individueller Ratengestaltung,
    denn mit AutoFlex sind
    Ratenänderungen – unter
    Berücksichtigung der Mindestrate –
    jederzeit kostenlos und problemlos
    möglich. Sie bestimmen die
    Ratenhöhe und die Sondertilgungen.
</p>
                                            <ul>
                                                <li>Niedrige Monatsraten</li>
                                                <li>Hohe Entscheidungsfreiheit</li>
                                                <li>3 Optionen bei Vertragsende</li>
                                            </ul>


                                        </div>
                                    </div>
                                </Col>

                            </Row>

                            <Row className="finance-title">
                                <Col md="12">
                                    <div className="sub-title text-center">
                                        <h2>ABGESICHERT. AUCH IM FALL DER FÄLLE</h2>
                                        <p>Gewappnet gegen den Ernstfall.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>

                                <Col lg="12" className="tabs-wrap">
                                    <ul>
                                        <li className={this.state.active == 0 ? 'active' : null} onClick={() => this.setState({ active: 0 })}>RatenSchutzVersicherung</li>
                                        <li className={this.state.active == 1 ? 'active' : null} onClick={() => this.setState({ active: 1 })}>Santander AutoCare</li>
                                        <li className={this.state.active == 2 ? 'active' : null} onClick={() => this.setState({ active: 2 })}>Santander AutoFlat</li>
                                        <li className={this.state.active == 3 ? 'active' : null} onClick={() => this.setState({ active: 3 })}>Santander Safe</li>
                                    </ul>
                                    <div>
                                        {
                                            window.innerWidth < 768 || this.state.active == 0 ?
                                                <div className="content">
                                                    <h3>RatenSchutzVersicherung</h3>
                                                    <h6>Gewappnet gegen den Ernstfall.</h6>
                                                    <p>Die RatenSchutzVersicherung (RSV) schützt Sie und Ihre Familie bei schweren Schicksalsschlägen vor finanziellen Engpässen. Bei Unfalltod, Tod oder Arbeitsunfähigkeit werden die Finanzierungsraten von der RSV übernommen. Optional können Sie auch Ihren Lebenspartner als zweiten Darlehensnehmer mit absichern. Sie können die RSV auch mit einem Schutz bei eventueller Arbeitslosigkeit kombinieren. Die Raten werden dann bei unverschuldeter Arbeitslosigkeit von der Versicherung übernommen.</p>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            window.innerWidth < 768 || this.state.active == 1 ?
                                                <div className="content">
                                                    <h3>Santander AutoCare</h3>
                                                    <h6>Immer mobil. Immer liquide.</h6>
                                                    <p>Wenn ein Defekt am Fahrzeug auftritt, geht es nicht nur darum, schnellstmöglich wieder mobil zu sein, sondern auch um den finanziellen Aspekt. Denn das Budget für eine Reparatur hat man doch eher selten einfach so herumliegen. Santander AutoCare fängt dieses Risiko auf – durch die Reparaturkostenversicherung aller wichtigen Bauteile – und liegt damit weit über dem Leistungsumfang der meisten marktüblichen Versicherungsprodukte. Bekannt als fester Bestandteil der Santander AutoFlat gibt es Santander AutoCare jetzt auch als eigenständiges Produkt.</p>
                                                    <h6>Ein Überblick über die wichtigsten versicherten Bauteile.</h6>
                                                    <p>Hier erhalten Sie einen beispielhaften Überblick darüber, welche wichtigen und vor allem kostenintensiven Bauteile mit Santander AutoCare abgesichert sind:</p>
                                                    <ul>
                                                        <li>Motor</li>
                                                        <li>Schalt-/Automatikgetriebe</li>
                                                        <li>Bremsen</li>
                                                        <li>Lenkung</li>
                                                        <li>Elektrische Anlage</li>
                                                        <li>Kühlsystem</li>
                                                        <li>Abgasanlage</li>
                                                        <li>Sicherheitssysteme</li>
                                                        <li>Klimaanlage</li>
                                                        <li>Komfortelektrik</li>
                                                    </ul>
                                                    <h6>Info</h6>
                                                    <p>Wenn Sie sich entscheiden, Ihr Fahrzeug mit der Santander AutoFlat zu finanzieren, ist SantanderAutoCare bereits im Leistungsumfang inbegriffen.</p>
                                                    <h5>Santander AutoCare - in 90 Sekunden erklärt.</h5>
                                                    <iframe width="569" height="320" src="https://www.youtube.com/embed/yBKgSy0foDY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            window.innerWidth < 768 || this.state.active == 2 ?
                                                <div className="content">
                                                    <h3>Santander AutoFlat</h3>
                                                    <h6>Das Rundum-sorglos-Paket.</h6>
                                                    <p>Die AutoFlatkombiniert 4 verschiedene Services und schützt somit zu einem geringen monatlichen Festpreis vor großen Gefahren und Kostenfaktoren, die im Laufe der Zeit entstehen können: Die enthaltene Finanzierung garantiert faire Konditionen und einfach zu überschauende Kosten, Santander Safesichert bei einem eventuellen Fahrzeugverlust ab, Santander AutoCareschützt vor den Reparaturkosten der wichtigsten Bauteile und die Händler-Service-Leistungensind ein Garant für die optimale Wartung und Pflege des neuen Wagens.</p>
                                                    <h5>Santander AutoFlat in 90 Sekunden erklärt.</h5>
                                                    <iframe width="569" height="320" src="https://www.youtube.com/embed/RrP7hTGyfDY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            window.innerWidth < 768 || this.state.active == 3 ?
                                                <div className="content">
                                                    <h3>Santander Safe</h3>
                                                    <h6>Sichert den Wert Ihres Fahrzeugs.</h6>
                                                    <p>Auch die beste Pflege hält den Wertverlust, den ein Neufahrzeug schon im ersten Jahr verbuchen muss, nicht auf. Hier kommt Santander Safe ins Spiel: Während eine herkömmliche Kaskoversicherung nur den Zeitwert zahlt und Ihnen gegebenenfalls mehrere Tausend Euro fehlen für den Kauf eines gleichwertigen Fahrzeugs, schließt Santander Safe diesen finanziellen Verlust von vornherein aus: Im Falle eines Totaldiebstahls oder Totalschadens wird Ihnen die Differenz zwischen dem Zeitwert am Tag des Schadens und dem ursprünglichen Kaufpreis Ihres Fahrzeugs ausgezahlt. In Verbindung mit einer Kaskoversicherung steht Ihnen dann exakt der Betrag zur Verfügung, den Sie für Ihr Neufahrzeug gezahlt hatten. Mehr noch: Mit der Leistungserhöhung über jährlich 3 % des Kaufpreises2 wird auch eine eventuelle Inflation ausgeglichen.</p>
                                                    <h5>Santander Safe - in 90 Sekunden erklärt</h5>
                                                    <iframe width="569" height="320" src="https://www.youtube.com/embed/44dwp7BPgsQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                                                </div>
                                                :
                                                null
                                        }

                                    </div>
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



export default connect(mapStateToProps)(PageWithLayout(FinancePage));
