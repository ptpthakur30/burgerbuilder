/**
 * Implemented SPA for checkout page
 */
import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
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

    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                />
                {/* <Route path={this.props.match.url+'/contact-data'} component={ContactData}/> */}
                {/* Passing data between pages */}
                <Route path={this.props.match.url+'/contact-data'} 
                render={(props)=>(<ContactData ingredients={this.state.ingredients} 
                price={this.state.price} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout

