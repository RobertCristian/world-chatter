import React, {Component} from 'react';
import Map from './Map';
import {
    SmallOverlay,
    ExpandedOverlay,
    ChooseLocationOverlay,
    NewChatOverlay,
} from './Overlay';
import {postData, fetchData} from '../lib/Helpers'

export default class App extends Component {
    constructor(props) {
        super(props);

        const profile_name = localStorage.getItem('profile_name')
            ? localStorage.getItem('profile_name')
            : null;

        this.state = {
            profile_name: profile_name,
            markers: [],
            startedChatting: false,
            newChatMode: false,
            showNewChatModal: false,
            chat_name: null,
            currentPos: null,
            goToChat: null,
            error: null
        };
    }

    async componentWillMount() {
        const data = await fetchData('api/chatroom', true);
        let markers = [];

        data.map((chatRoom) => {
            return markers.push({
                id: chatRoom.id,
                name: chatRoom.name,
                position: {
                    lat: chatRoom.lat,
                    lng: chatRoom.lng
                },
                messagesCount: chatRoom.messages.length
            })
        });

        this.setState({
            markers: markers
        })
    }

    onNameInputChange = async (e) => {
        const profile_name = e.target.value;

        await this.setState({
            profile_name: profile_name.length > 0 ? profile_name : null
        });

        localStorage.setItem('profile_name', profile_name);
    };

    startChattingBtnHandler = () => {
        this.setState({
            startedChatting: true
        })
    };

    newChatBtnHandler = () => {
        this.setState({
            newChatMode: true
        })
    };

    mapClickHandler = async (e) => {
        const {showNewChatModal, newChatMode} = this.state;

        if (showNewChatModal) {
            await this.setState({
                currentPos: null,
                showNewChatModal: false,
            })
        } else {
            if (newChatMode) {
                await this.setState({
                    currentPos: e.latlng,
                    newChatMode: false,
                    showNewChatModal: true
                });
            }
        }
    };

    storeNewChatLocation = async (e) => {
        e.preventDefault();
        const {lat, lng} = this.state.currentPos;
        const chatName = await e.target.elements.chat_name.value;

        if (chatName && chatName.length > 0) {
            const data = await postData('api/chatroom', {
                name: chatName,
                lat: lat,
                lng: lng
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
                const marker = {
                    id: data.id,
                    name: data.name,
                    position: {
                        lat: data.lat,
                        lng: data.lng
                    }
                };

                await this.setState({
                    currentPos: null,
                    chatName: null,
                    markers: [...this.state.markers, marker],
                    showNewChatModal: false,
                    error: null
                });
            }
        } else {
            this.setState({
                error: 'Please enter a valid chat name!'
            })
        }
    };

    mapMarkerClickHandler = async (e) => {
        const {profile_name} = this.state;
        const goToChat = e.target.options.id;

        if ((goToChat && goToChat > 0) && (profile_name && profile_name.length > 0)) {
            await this.setState({
                goToChat: null
            });

            await this.setState({
                goToChat: goToChat
            })
        } else {
            this.setState({
                error: 'Please enter a name first'
            });
        }
    };

    clearGoToChat = async () => {
        await this.setState({
            startedChatting: true,
            goToChat: null
        })
    };

    render() {
        let {
            profile_name,
            currentPos,
            startedChatting,
            newChatMode,
            showNewChatModal,
            markers,
            goToChat,
            error
        } = this.state;

        let overlay;
        let chooseLocationOverlay;
        let chatModal;

        if (startedChatting || (goToChat && goToChat > 0)) {
            if (!newChatMode) {
                overlay = <ExpandedOverlay
                    goToChat={goToChat}
                    profile_name={profile_name}
                    markers={markers}
                    newChatBtnHandler={this.newChatBtnHandler}
                    clearGoToChat={this.clearGoToChat}/>
            }
        } else {
            overlay = <SmallOverlay
                error={error}
                profile_name={profile_name}
                onChangeValue={this.onNameInputChange}
                startChatting={this.startChattingBtnHandler}/>
        }

        if (newChatMode) {
            chooseLocationOverlay = <ChooseLocationOverlay/>
        }

        if (showNewChatModal) {
            chatModal = <NewChatOverlay storeNewChatLocation={this.storeNewChatLocation}
                                        currentPos={currentPos}
                                        error={error}/>
        }

        return (
            <div>
                <Map
                    currentPos={currentPos}
                    markers={markers}
                    mapClickHandler={this.mapClickHandler}
                    mapMarkerClickHandler={this.mapMarkerClickHandler}/>
                {overlay}
                {chooseLocationOverlay}
                {chatModal}
            </div>
        );
    }
}