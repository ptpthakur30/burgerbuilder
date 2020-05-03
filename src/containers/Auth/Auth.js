/**
 * Handles the authentication 
 */
import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateObject, checkValidity } from '../../shared/utility'
import * as authActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

export const auth = props => {

    const [controls, setcontrols] = useState({
        Email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email Address'
            },
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        Password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            value: ''
        }
    }
    );

    const [isSignUp, setisSignUp] = useState({ isSignUp: true })

    const {buildingBurger,authRedirectPath,onSetAuthRedirectPath}=props;
    useEffect(() => {
        // if the user is not building burger and the authRedirectPath is '/checkout'
        // We are redirecting to '/' after login
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    },[buildingBurger,authRedirectPath,onSetAuthRedirectPath])

    // Handles the onChange event of the input element
    const inputChangedHandler = (event, elementName) => {
        // Copy parent Object
        const updatedControl = updateObject(controls, {
            // Copy child Object
            [elementName]: updateObject(controls[elementName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[elementName].validation),
                touched: true
            })
        })
        setcontrols(updatedControl);
    }

    const authHandler = (event) => {
        event.preventDefault();
        props.onAuthSubmit(controls.Email.value, controls.Password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setisSignUp(!isSignUp);
    }


    // for getting the form elements from the js state
    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }
    let form = (
        <form onSubmit={authHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementName={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    valid={formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success">SUBMIT</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    let authRedirect = null
    if (props.isAuthenticated) {
        // Here we are dynamically setting the redirect path
        // CASE '/' : When the user is not building burger
        // CASE '/checkout' : When the user has built a burger and is redirected to authentication page
        authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
            <Button btnType="Danger"
                clicked={switchAuthModeHandler}>SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthSubmit: (email, password, method) => dispatch(authActions.auth(email, password, method)),
        onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);
