/**
 * It contains the states and wraps below
 * Modal
 * The Burger 
 * The Build Controls
 */
import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import { connect } from 'react-redux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as BurgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        showOrderSummary: false,
    }

    componentDidMount() {
        this.props.onInitIngredients()
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
        return sum > 0 ;
    }

    // To check whether the Order Now Button has been clicked or not
    orderHandler = () => {
        this.setState({ showOrderSummary: true });
    }

    // To check whether the Order Now Button has been clicked or not
    cancelPurchaseHandler = () => {
        this.setState({ showOrderSummary: false });
    }

    purchaseContinueHandler = () => {

        let queryParams = [];
        //here for multiple key value pair we used array
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        queryParams = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams
        });
    }

    render() {
        const disabledButton = {
            ...this.props.ingredients
        };
        // {salad:true,meat:true,...}
        for (let key in disabledButton) {
            disabledButton[key] = disabledButton[key] <= 0;
        }
        let ordersSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    {/* Used to see the Burger with all the ingredients */}
                    <Burger ingredients={this.props.ingredients} />

                    {/* Used to see the controller for adding and removing the ingredients and order now button */}
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientDeleted={this.props.onIngredientRemoved}
                        disabledBtn={disabledButton}
                        currentPrice={this.props.price}
                        // Call a function when a component renders
                        purchasable={this.purchaseHandler(this.props.ingredients)}
                        ordered={this.orderHandler}
                    />
                </Aux>
            );
            ordersSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.cancelPurchaseHandler}
                price={this.props.price}
            />
        }
       
        return (
            <Aux>
                {/* Used to see the model and Order Summary within it */}
                {/* The Order summary should only be rendered when the modal is rendered
                Therefore we can improve performance by adding class component lifecycle
                */}
                <Modal show={this.state.showOrderSummary} clicked={this.cancelPurchaseHandler}>
                    {ordersSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

// for getting the slide of state from store as props
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price : state.totalPrice,
        error : state.error
    }
}

// for redux reducer to get the action
const mapDispatchToProps = dispatch => {
    return {
        // use dispatch here
        onIngredientAdded: (ingredientName) => dispatch(BurgerBuilderActions.addIngredients(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(BurgerBuilderActions.removeIngredients(ingredientName)),
        onInitIngredients: ()=>dispatch(BurgerBuilderActions.initIngredients())
    }
};

// the connect is used to pass the action and use the state as props in the container
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, Axios));