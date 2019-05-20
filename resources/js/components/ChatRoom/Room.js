import React, {Component} from 'react';
import {Message} from '../ChatRoom/Message';
import defaultProfile from '../../../img/default-profile.png';
import {fetchData, postData} from "../../lib/Helpers";
import {Button, Input} from "../Shared";
import Error from '../Error';

export default class Room extends Component {
    state = {
        chatName: null,
        chatRoomMessages: [],
        currentMessage: null,
        error: null
    };

    loadRoom = async () => {
        let messages = [];
        const data = await fetchData(`api/chatroom/${this.props.activeChatRoomId}`, true);

        data.messages.map((message) => {
            return messages.push({
                message_id: message.id,
                chatRoomId: message.chatRoom_id,
                message: message.message,
                sender: message.sender,
                created_at: message.created_at
            })
        });

        await this.setState({
            chatName: data.name,
            chatRoomMessages: messages
        });

        this.scrollToBottom();
    };

    async componentWillMount() {
        await this.loadRoom()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeChatRoomId && this.props.activeChatRoomId !== prevProps.activeChatRoomId) {
            await window.Echo.channel(`chat-${prevProps.activeChatRoomId}`).stopListening('MessageSent');
            await this.loadRoom();
            this.listen()
        }
    }

    componentDidMount() {
        this.listen();
    }

    async componentWillUnmount() {
        await window.Echo.channel(`chat-${this.props.activeChatRoomId}`).stopListening('MessageSent');
    }

    sendMessageBtnHandler = async (e) => {
        const {profile_name, activeChatRoomId} = this.props;
        const {currentMessage} = this.state;
        const data = await postData('api/chatroom/messages', {
            chatRoomId: activeChatRoomId,
            message: currentMessage,
            sender: profile_name
        }, true);

        if (data.errors) {
            let errors = [];

            Object.keys(data.errors).forEach((errorItem) => {
                data.errors[errorItem].map((errorMessage) => {
                    return errors.push(errorMessage)
                })
            });

            await this.setState({
                error: errors
            })
        } else {
            this.setState({
                currentMessage: null
            });

            this.messageInput.value = '';
            this.scrollToBottom();
        }
    };

    onMessageInputChange = async (e) => {
        let message = e.target.value;

        await this.setState({
            currentMessage: message
        });
    };

    scrollToBottom = () => {
        if (this.messageItem) {
            this.messageItem.scrollIntoView({behavior: 'smooth'});
        }
    };

    listen = () => {
        window.Echo.channel('chat-' + this.props.activeChatRoomId)
            .listen('MessageSent', async ({sender, message, message_id, created_at}) => {
                await this.setState({
                    chatRoomMessages: [...this.state.chatRoomMessages, {
                        message_id,
                        chatRoomId: this.props.chatRoomId,
                        sender,
                        message,
                        created_at
                    }]
                });
                this.scrollToBottom();
            });
    };

    render() {
        const {
            profile_name,
            backToChatListBtnHandler
        } = this.props;

        const {chatRoomMessages, chatName, error} = this.state;

        return (
            <div className='bg-white overlay_chatOpen'>
                <div className="overlay_chatOpen__header justify-content-center">
                    <img alt="profile picture" src={defaultProfile} className="overlay_chatOpen__img mr-5"/>
                    <h4>{profile_name}</h4>
                </div>

                <div className="overlay_chatOpen__card">
                    <div className="d-flex align-items-center mb-4">
                        <a href="#" onClick={backToChatListBtnHandler}>
                            <i className="text-dark fas fa-chevron-left fa-2x"></i>
                        </a>
                        <h5 className="mb-0 flex-grow-1">{chatName}</h5>
                    </div>

                    <div className="container overlay_chatOpen__messageContainer">
                        {chatRoomMessages.map((message, index, arr) => {
                            return <Message key={message.message_id}
                                            profile_name={profile_name}
                                            message_id={message.message_id}
                                            message={message.message}
                                            sender={message.sender}
                                            created_at={message.created_at}
                                            refProp={arr.length - 1 === index ? el => {
                                                this.messageItem = el;
                                            } : ''}/>
                        })}
                    </div>
                </div>

                <div className="overlay_chatOpen__footer">
                    <div className="d-flex">
                        <Input className="flex-grow-1 mr-3" type="text" placeholder="Type a message"
                               onKeyDown={this.sendMessageBtnHandler}
                               onChange={this.onMessageInputChange} refProp={el => {
                            this.messageInput = el
                        }}/>
                        <Button className="btn btn-dark" onClick={this.sendMessageBtnHandler} buttonText="Send"/>
                    </div>

                    <Error error={error}/>
                </div>
            </div>
        )
    }
}