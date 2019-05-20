import React, {Component} from 'react';
import {Button, Input} from "../Shared";
import Error from '../Error';

export default class NewChatOverlay extends Component {
    render() {
        const {
            storeNewChatLocation,
            currentPos,
            error
        } = this.props;

        return (
            <div className="overlay_newChat">
                <Error error={error} elementClassName="h5"/>

                <form className="overlay_newChat__form" onSubmit={storeNewChatLocation}>
                    <h4>New Chat</h4>
                    <p className="mr-3">
                        Lat: {currentPos.lat.toFixed(2)}, Lng: {currentPos.lng.toFixed(2)}
                    </p>
                    <Input type="text" placeholder="Name this chat" name="chat_name"
                           className="overlay_newChat__input mb-3"/>
                    <Button type="submit" className="btn btn-dark overlay_newChat__button" buttonText="Create"/>
                </form>
            </div>
        )
    }
}