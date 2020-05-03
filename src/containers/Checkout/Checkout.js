/**
 * Implemented SPA for checkout page
 */
import React from 'react'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
const checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    // Redirect if the ingredients is not set
    let summary = <Redirect to="/" />
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            // Redirect if Purhcase is successful
            < div >
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />

                <Route path={props.match.url + '/contact-data'}
                    component={ContactData} />
            </div >

        )
    }
    return summary;

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

// Use connect
export default connect(mapStateToProps)(checkout);

