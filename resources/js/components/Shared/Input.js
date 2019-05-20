import React, {Component} from 'react';

export default class Input extends Component {
    submitOnEnter = (e) => {
        if ((e.which === 13 && e.target.value.length > 0) || e.which === undefined) {
            this.props.onKeyDown();
        }
    };

    render() {
        const {
            className,
            type,
            ariaDescribedBy,
            placeholder,
            onChange,
            defaultValue,
            name,
            refProp,
            onKeyDown,
            disabled
        } = this.props;

        return <input className={"form-control " + className}
                      type={type}
                      aria-describedby={ariaDescribedBy}
                      placeholder={placeholder}
                      onChange={onChange}
                      defaultValue={defaultValue}
                      name={name}
                      ref={refProp}
                      onKeyDown={onKeyDown ? this.submitOnEnter : null}
                      disabled={disabled}
        />
    }
}