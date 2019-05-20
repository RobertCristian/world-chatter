import React from 'react';

export default function Button(props) {
    const {
        className,
        onClick,
        disabled,
        icon,
        buttonText
    } = props;

    return <button className={className} onClick={onClick} disabled={disabled}>
        {icon}
        {buttonText}
    </button>
}