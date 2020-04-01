/**
 * Used for showing the Order summary as a list
 */
import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igkeys) => {
                return (<li key={igkeys}>
                    <span style={{ textTransform: 'capitalize' }}>{igkeys}</span>: {this.props.ingredients[igkeys]}
                </li>)
            })
        return (
            <Aux>
                <h1>Order Summary!!!</h1>
                <p>The delicious burger contains the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;
