import React, { Component } from 'react';

import userImage from '../../assets/images/user.png';
import sendMessageIcon from '../../assets/svg/send-message.svg';
import Isvg from 'react-inlinesvg';
import moment from 'moment';
import Page from '../../containers/admin/page';

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
            users: [],
            selectedUser: null,
            messages: []
        };

    }

    componentWillMount() {
        if (!localStorage.getItem('token')) {
            this.props[0].history.push('/login')
        }

    }



    getMyOrders = async () => {
        fetch('https://localhost:8282/api/orders/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(async (res) => {
            const body = await res.json();
            let users = {};
            for (let i = 0; i < body.length; i++) {
                if (body[i].status == 'PAID')
                    users[body[i].renterId] = body[i].renterId;
            }

            this.setState({
                users: Object.keys(users)
            })
        })
    }

    getMessages = (username) => {
        fetch('https://localhost:8282/message/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                receiverId: username,
            })
        }).then((res) => res.json()).then((result) => {
            this.setState({
                messages: result
            })
        })

    }

    sendMessage = () => {
        if (!this.state.message) {
            return;
        }

        fetch('https://localhost:8282/message/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                receiverId: this.state.selectedUser,
                message: this.state.message
            })
        }).then((res) => res.json()).then((result) => {
            this.getMessages(this.state.selectedUser);
        })



        this.setState({
            message: ''
        })
    }


    componentDidMount() {
        this.getMyOrders();

    }


    render() {
        return (
            <div className="messages-wrap">
                <div className="left">
                    <h6>Users</h6>
                    <ul>
                        {
                            this.state.users.map((item, idx) => {
                                return (
                                    <li key={idx} onClick={() => this.setState({ selectedUser: item, messages: [] }, () => this.getMessages(item))}>
                                        <img src={userImage} />
                                        <div>
                                            <h6>{item}</h6>
                                        </div>
                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>
                {this.state.selectedUser ?
                    <div className="right">
                        <div className="head">
                            <img src={userImage} />
                            <h6>{this.state.selectedUser}</h6>
                        </div>

                        <div className="messages">
                            {
                                this.state.messages.map((item, idx) => {
                                    return (
                                        <div className={item.senderId == this.state.selectedUser ? 'message left-message' : 'message'}>
                                            <img src={userImage} />
                                            <div>
                                                <p className="text">{item.message}</p>
                                                <p className="date">{moment.unix(item.timestamp).format('DD.MM.YYYY HH:mm')}</p>

                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>

                        <div className="send-message-wrap">
                            <textarea onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message}></textarea>
                            <button onClick={this.sendMessage}><Isvg src={sendMessageIcon} /></button>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }

}


export default Page(Messages); 