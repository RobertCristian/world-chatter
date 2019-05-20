import React, {Component} from 'react';

export default class Message extends Component {
    render() {
        const {
            profile_name,
            message_id,
            message,
            sender,
            created_at,
            refProp
        } = this.props;

        return (
            <div key={message_id} className={"overlay_chatOpen__messageContainer row flex-column " + (sender === profile_name ? 'align-items-end' : 'align-items-start')}
                 ref={refProp}>
                <span className="overlay_chatOpen__message">{message}</span>
                <small>{created_at} - {sender}</small>
            </div>
        )
    }
}