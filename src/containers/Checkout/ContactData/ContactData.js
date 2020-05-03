/**
 * The contact data is used to show and handle forms, the form is submitted in the firebase
 */
import React, { useState } from 'react'
import classes from './ContactData.css';
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { updateObject, checkValidity } from '../../../shared/utility'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderBurgerActions from '../../../store/actions/index'
export const contactData = props => {
    // split the form state into two parts i.e orderForm and formIsValid
    const [orderForm, setorderForm] = useState({
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
        }
    )

    const [formIsValid, setformIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formvalue = {};
        for (let formElementIdentifier in orderForm) {
            formvalue[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const orderDetails = {
            ingredients: props.ingredients,
            totalPrice: props.price,
            orderData: formvalue,
            // pass the userId for filtering order based on userId
            userId: props.userId
        }
        // passing the auth token
        props.onOrderBurger(orderDetails, props.token);
    }


    const inputChangedHandler = (event, inputIdentifier) => {

        // Since there are objects inside object so we need to deep clone to make state immutable update
        const updatedFormElement = updateObject(orderForm[inputIdentifier],
            {
                value: event.target.value,
                valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
                touched: true
            })
        const updatedform = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let formInputIdentifier in updatedform) {
            formIsValid = updatedform[formInputIdentifier].valid && formIsValid;
        }
        // Here we are updating the two state slices of form
        setorderForm(updatedform);
        setformIsValid(formIsValid);
    }

    // for getting the form elements from the js state
    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
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
            <Button btnType="Success" clicked={orderHandler}
                disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )

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
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, Axios));
