import React from 'react';

export default function List(props) {
    const {markers, openChatBtnHandler} = props;
    let chatList;

    if (markers && markers.length > 0) {
        chatList = markers.map((marker) => {
            return <a href="#" id={marker.id} key={marker.id} onClick={openChatBtnHandler}>
                <li className="chatRoom_container">
                    <h4 className="chatRoom_name">{marker.name}</h4>
                    <p>Latitude: {marker.position.lat.toFixed(2)} Longitude: {marker.position.lng.toFixed(2)}</p>
                </li>
            </a>
        });
    } else {
        chatList = <><p className="mb-4">Nothing to show here</p><p>Use the + button to create a new chat</p></>
    }

    return <ul className="chatRoom_list">
        {chatList}
    </ul>
}