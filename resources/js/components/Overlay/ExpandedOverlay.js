import React, {Component} from 'react';
import {ChatRoomsList, Header, Room} from '../ChatRoom';
import {postData} from "../../lib/Helpers";

export default class ExpandedOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatOpen: props.goToChat && props.goToChat > 0 ? true : false,
            activeChatRoomId: null,
            searchValue: null
        };
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.goToChat && this.props.goToChat !== prevProps.goToChat) {
            await this.setState({
                activeChatRoomId: this.props.goToChat,
                chatOpen: true
            });
        }
    }

    openChatBtnHandler = async (e) => {
        e.preventDefault();
        const chatRoomId = e.currentTarget.id;

        await this.setState({
            chatOpen: true,
            activeChatRoomId: chatRoomId,
        });
    };

    backToChatListBtnHandler = async (e) => {
        e.preventDefault();
        const {goToChat, clearGoToChat} = this.props;

        if (goToChat && goToChat > 0) {
            await clearGoToChat();

            await this.setState({
                chatOpen: false,
                activeChatRoomId: null,
            });
        } else {
            await this.setState({
                chatOpen: false,
                activeChatRoomId: null,
            });
        }
    };

    onSearchValueChange = async (e) => {
        let markers = [];
        const searchValue = e.target.value;

        await this.setState({
            searchValue
        });

        const api_call = await postData('api/chatroom/search', {
            searchValue: searchValue
        }, true);

        api_call.map((marker) => {
            return markers.push({
                id: marker.id,
                name: marker.name,
                position: {
                    lat: marker.lat,
                    lng: marker.lng
                }
            })
        });

        this.setState({
            queriedMarkers: markers
        })
    };

    render() {
        let overlayContent;
        const {
            markers,
            profile_name,
            newChatBtnHandler,
            goToChat,
        } = this.props;

        const {
            chatOpen,
            activeChatRoomId,
            queriedMarkers,
            searchValue
        } = this.state;

        if (chatOpen || (goToChat && goToChat > 0)) {
            overlayContent = <Room
                profile_name={profile_name}
                backToChatListBtnHandler={this.backToChatListBtnHandler}
                activeChatRoomId={activeChatRoomId ? activeChatRoomId : goToChat}/>
        } else {
            overlayContent = <ChatRoomsList
                searchValue={searchValue}
                markers={queriedMarkers ? queriedMarkers : markers}
                newChatBtnHandler={newChatBtnHandler}
                openChatBtnHandler={this.openChatBtnHandler}
                onSearchValueChange={this.onSearchValueChange}/>
        }

        return (
            <div className='bg-white overlay_expanded'>
                <Header profile_name={profile_name}/>

                {overlayContent}
            </div>
        )
    }
}