/**
 * It contains the states and wraps below
 * Modal
 * The Burger 
 * The Build Controls
 */
import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 10,
    meat: 30,
    bacon: 20
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        showOrderSummary: false
    }

    // To activate or deactivate the Order Now button based on the ingredients total count
    purchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkeys => {
                return ingredients[igkeys];
            })
            .reduce((sum, elr) => {
                return sum + elr;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    // To check whether the Order Now Button has been clicked or not
    orderHandler = () => {
        this.setState({ showOrderSummary: true });
    }

    // To check whether the Order Now Button has been clicked or not
    cancelPurchaseHandler = () => {
        this.setState({ showOrderSummary: false });
    }

    purchaseContinueHandler=()=>{
        alert('You continued the Order');
    }

    // For adding the ingredients
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        });
        this.purchaseHandler(updatedIngredient);
    };

    // For removing the ingredients
    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        });
        this.purchaseHandler(updatedIngredient);
    }

    render() {
        const disabledButton = {
            ...this.state.ingredients
        };
        // {salad:true,meat:true,...}
        for (let key in disabledButton) {
            disabledButton[key] = disabledButton[key] <= 0;
        }
        return (
            <Aux>
                {/* Used to see the model and Order Summary within it */}
                <Modal show={this.state.showOrderSummary} cancelPurchase={this.cancelPurchaseHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseContinue={this.purchaseContinueHandler}
                        purchaseCancel={this.cancelPurchaseHandler}
                    />
                </Modal>

                {/* Used to see the Burger with all the ingredients */}
                <Burger ingredients={this.state.ingredients} />

                {/* Used to see the controller for adding and removing the ingredients and order now button */}
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientDeleted={this.deleteIngredientHandler}
                    disabledBtn={disabledButton}
                    currentPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.orderHandler}
                />

            </Aux>
        )
    }
}
export default BurgerBuilder;