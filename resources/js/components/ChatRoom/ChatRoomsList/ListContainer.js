import React from 'react';
import List from './List';
import {Button, Input} from "../../Shared";

export default function ListContainer(props) {
    const {
        markers,
        openChatBtnHandler,
        newChatBtnHandler,
        onSearchValueChange,
        searchValue
    } = props;

    return <div className="overlay_expanded__card">
        <div className="d-flex justify-content-around mb-4">
            <Input className="overlay_expanded__input" type="text" onChange={onSearchValueChange}
                   defaultValue={searchValue}/>
            <Button className="btn btn-default btn-circle" onClick={newChatBtnHandler}
                    icon={<i className="fas fa-plus-circle"></i>}/>
        </div>

        <List markers={markers} openChatBtnHandler={openChatBtnHandler}/>
    </div>
}