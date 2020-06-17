import React, { Component } from 'react';

import userImage from '../assets/images/user.png';
import sendMessageIcon from '../assets/svg/send-message.svg';
import Isvg from 'react-inlinesvg';

import {
    Container,
    Row,
    Col,
    CarouselItem,
} from 'reactstrap';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentWillMount() {
        if (!localStorage.getItem('token')) {
            this.props[0].history.push('/signin')
        }

    }


    render() {
        return (
            <div className="messages-wrap">
                <div className="left">
                    <h6>Users</h6>
                    <ul>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                        <li>
                            <img src={userImage} />
                            <div>
                                <h6>Pero Peric</h6>
                                <p>Koliko ima konja?</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <div className="head">
                        <img src={userImage} />
                        <h6>Pero Peric</h6>
                    </div>

                    <div className="messages">
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>

                        <div className="message left-message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message left-message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message left-message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div><div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message left-message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div><div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message left-message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                        <div className="message">
                            <img src={userImage} />
                            <div>
                                <p className="text">Lorem ipsum sit dorem arem.</p>
                                <p className="date">24.06.2020</p>

                            </div>
                        </div>
                    </div>

                    <div className="send-message-wrap">
                    <textarea></textarea>
                    <button><Isvg src={sendMessageIcon} /></button>
                        </div>
                </div>
            </div>
        );
    }

}


export default Messages; 