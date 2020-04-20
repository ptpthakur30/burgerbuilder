/**
 * Implemented SPA for checkout page
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {


    /***************************<Other way of doing>******************************
     * 
     state = {
        ingredients: null,
        price:0
    }
     //It needs to be rendered before child component
    componentWillMount()
    {
        const ingredients={};
        let price = 0;
        //URLSearchParams is used to extract location.search values
        const query = new URLSearchParams(this.props.location.search);
        //query.entries() to get the params in array
        for(let param of query.entries())
        {
            if(param[0]==="price")
            {
                price = param[1];
            }
            else{
                ingredients[param[0]]=+param[1];
            }
        }
        this.setState({ingredients:ingredients, price:price});
    }
    ****************************************************************************/


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        // Redirect if the ingredients is not set
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                // Redirect if Purhcase is successful
                < div >
                { purchasedRedirect }
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />

                <Route path={this.props.match.url + '/contact-data'}
                    component={ContactData} />
                </div >

            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

// Use connect
export default connect(mapStateToProps)(Checkout);

