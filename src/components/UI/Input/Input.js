import React from 'react'
import classes from './Input.css'
const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;
    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>
            Please enter a valid {props.elementName.toUpperCase()}
            </p>
    }
    inputClasses = inputClasses.join(' ');
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.displayName}
                        </option>)
                    )}
                </select>
            )
            break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input
