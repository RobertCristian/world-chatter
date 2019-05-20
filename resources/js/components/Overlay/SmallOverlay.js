import React from 'react';
import {Button, Input} from '../Shared'
import Error from "../Error";

export default function SmallOverlay(props) {
    const {
        profile_name,
        startChatting,
        onChangeValue,
        error
    } = props;

    return (
        <div className='overlay_small'>
            <Input
                className="overlay_small__input"
                type="text"
                placeholder="Your name"
                ariaDescribedBy="userName"
                defaultValue={profile_name}
                onChange={onChangeValue}
                onKeyDown={startChatting}
            />

            <Button onClick={startChatting} className="btn btn-dark mb-2"
                    buttonText="Start Chatting" disabled={!profile_name || (profile_name && profile_name.length < 1)}/>

            <Error error={error}/>
        </div>
    )
}