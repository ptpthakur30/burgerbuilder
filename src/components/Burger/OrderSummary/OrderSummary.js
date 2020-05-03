/**
 * Used for showing the Order summary as a list
 */
import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = props=> {
        const ingredientSummary = Object.keys(props.ingredients)
            .map((igkeys) => {
                return (<li key={igkeys}>
                    <span style={{ textTransform: 'capitalize' }}>{igkeys}</span>: {props.ingredients[igkeys]}
                </li>)
            })
        return (
            <Aux>
                <h1>Order Summary!!!</h1>
                <p>The delicious burger contains the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    
}

export default orderSummary;
