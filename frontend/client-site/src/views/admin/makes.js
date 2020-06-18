import React, { Component } from 'react';
import { PageWithLayout } from '../../containers/page';
import { connect } from 'react-redux';
import Form from '../../components/forms/makeForm';
import PageHeader from '../../containers/header/pageHeader';
import Footer from '../../containers/footer';
import { Link } from 'react-router-dom';

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

class Makes extends Component {
    constructor(props) {
        super(props);

    }




    render() {



        return (
            <div >
                <PageHeader page='Fahrzeuge' {...this.props} />
                <div className="page-wrap">
                    <section className="admin-wrap">
                        <Container>
                            <ul className="admin-tabs">
                                <li className={this.props[0].match.params.type == 'makes' ? "active" : null }> <Link to='/car-attributes/makes'>Makes</Link></li>
                                <li className={this.props[0].match.params.type == 'models' ? "active" : null }> <Link to='/car-attributes/models'>Models</Link></li>
                                <li className={this.props[0].match.params.type == 'fuels' ? "active" : null }> <Link to='/car-attributes/fuels'>Fuels</Link></li>
                                <li className={this.props[0].match.params.type == 'classes' ? "active" : null }> <Link to='/car-attributes/classes'>Classes</Link></li>
                            </ul>

                            {!this.props[0].match.params.id ?

                                <Row>
                                    <Col lg="12">

                                        <table>
                                            <tr>
                                                <th>Name</th>
                                                <th>Options</th>
                                            </tr>
                                            <tr>
                                                <td>Audi</td>
                                                <td>
                                                    <Link to='/'><button><Isvg src={editIcon} /> </button></Link>
                                                    <button><Isvg src={deleteIcon} /> </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>VW</td>
                                                <td>
                                                    <Link to='/'><button><Isvg src={editIcon} /> </button></Link>
                                                    <button><Isvg src={deleteIcon} /> </button>
                                                </td>
                                            </tr>

                                        </table>

                                       <Link to={`/car-attributes/${this.props[0].match.params.type}/new`}> <button className="button add-new">Add</button></Link>
                                    </Col>
                                </Row>
                                :
                                <Form />
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
