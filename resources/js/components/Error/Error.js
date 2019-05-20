import React from 'react';

export default function Error(props) {
    const {
        error,
        className,
        elementClassName
    } = props;

    return <div className={"error_container " + className}>
        {error && typeof error == 'object' ? error.map((error, index) => {
            return <span key={index} className={"d-block text-danger " + elementClassName}>{error}</span>
        }) : <span className={"d-block text-danger " + elementClassName}>{error}</span>}</div>
}