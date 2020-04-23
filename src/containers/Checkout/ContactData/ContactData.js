/**
 * The contact data is used to show and handle forms, the form is submitted in the firebase
 */
import React, { Component } from 'react'
import classes from './ContactData.css';
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {updateObject,checkValidity} from '../../../shared/utility'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderBurgerActions from '../../../store/actions/index'
export class ContactData extends Component {
    state = {
        orderform: {
            name: {
                // The type of the element 
                elementType: 'input',
                // All html attributes are placed here
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                // for defining the validation rules
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            // for drop down options are passed in element config
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fatest', displayName: 'Fastest' },
                        { value: 'cheapest', displayName: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();

        const formvalue = {};
        for (let formElementIdentifier in this.state.orderform) {
            formvalue[formElementIdentifier] = this.state.orderform[formElementIdentifier].value;
        }
        const orderDetails = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: formvalue,
            // pass the userId for filtering order based on userId
            userId: this.props.userId
        }
        // passing the auth token
        this.props.onOrderBurger(orderDetails, this.props.token);
    }


    inputChangedHandler = (event, inputIdentifier) => {

        // Since there are objects inside object so we need to deep clone to make state immutable update
        const updatedFormElement = updateObject(this.state.orderform[inputIdentifier],
            {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.orderform[inputIdentifier].validation),
                touched: true
            })
        const updatedform = updateObject(this.state.orderform, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let formInputIdentifier in updatedform) {
            formIsValid = updatedform[formInputIdentifier].valid && formIsValid;
        }
        this.setState({ orderform: updatedform, formIsValid: formIsValid });
    }

    render() {
        // for getting the form elements from the js state
        const formElementsArray = [];
        for (let key in this.state.orderform) {
            formElementsArray.push({
                id: key,
                config: this.state.orderform[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
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
                <Button btnType="Success" clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderBurgerActions.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));