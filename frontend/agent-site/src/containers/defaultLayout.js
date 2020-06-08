import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export const DefaultLayout = (Wrapped) => (props) => {
    return (

        <div onTouchEnd={props.touchEnd} onTouchMove={props.touchMove}>
            { /* props._menuOpen ? 
                <Menu {...props} />

            : 
            null
            */
            }
            <ul className="mobile-navigation hide-desktop">
                <li><Link to='/'>Startseite</Link></li>
                <li> <Link to='/fahrzeuge'>Fahrzeuge</Link></li>
                <li> <Link to='/ankauf'>Ankauf</Link></li>
                <li><Link to='/finanzierung'>Finanzierung</Link></li>

                <li><Link to='/service'>Service</Link></li>
                <li><Link to='/galerie'>Galerie</Link></li>
                <li><Link to='/seite/karriere'>Karriere</Link></li>

                <li><Link to='/kontakt' >Kontakt</Link></li>
            </ul>

            <Wrapped {...props} />


            {
                /* props._modalOpen ?
                 <Modal {...props} /> : null
                 */
            }
        </div>
    );
};

export default DefaultLayout;