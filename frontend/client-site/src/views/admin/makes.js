import React, { Component } from 'react';
import { PageWithLayout } from '../../containers/page';
import { connect } from 'react-redux';
import Form from '../../components/forms/makeForm';
import PageHeader from '../../containers/header/pageHeader';
import Footer from '../../containers/footer';
import {Link} from 'react-router-dom';
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
                           <li className="active"> <Link to='/'>Makes</Link></li>
                           <li> <Link to='/'>Models</Link></li>
                           <li> <Link to='/'>Fuels</Link></li>
                           <li> <Link to='/'>Classes</Link></li>
                        </ul>
                    <Form />
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
