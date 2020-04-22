/**
 * Handles the authentication 
 */
import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {updateObject,checkValidity} from '../../shared/utility'
import * as authActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

export class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignUp: true
    }

    componentDidMount() {
        // if the user is not building burger and the authRedirectPath is '/checkout'
        // We are redirecting to '/' after login
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    // Handles the onChange event of the input element
    inputChangedHandler = (event, elementName) => {
        // ***********************One way********************************
        // const updatedControl = {
        //     ...this.state.controls,
        //     [elementName]: {
        //         ...this.state.controls[elementName],
        //         value: event.target.value,
        //         valid: checkValidity(event.target.value, this.state.controls[elementName].validation),
        //         touched: true
        //     }
        // }
        // *******************Other way*************************************
        // Copy parent Object
        const updatedControl = updateObject(this.state.controls, {
            // Copy child Object
            [elementName]: updateObject(this.state.controls[elementName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[elementName].validation),
                touched: true
            })
        })
        this.setState({ controls: updatedControl })
    }

    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuthSubmit(this.state.controls.Email.value, this.state.controls.Password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        // for getting the form elements from the js state
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (
            <form onSubmit={this.authHandler}>
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null
        if (this.props.isAuthenticated) {
            // Here we are dynamically setting the redirect path
            // CASE '/' : When the user is not building burger
            // CASE '/checkout' : When the user has built a burger and is redirected to authentication page
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button btnType="Danger"
                    clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
