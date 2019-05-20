import React from 'react';
import defaultProfile from "../../../img/default-profile.png";

export default function Header(props) {
    const { profile_name } = props;

    return <div className="overlay_expanded__header">
        <img alt="profile picture" src={defaultProfile} className="overlay_expanded__img mr-5"/>
        <h4>{profile_name}</h4>
    </div>
}