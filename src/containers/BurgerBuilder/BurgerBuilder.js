/**
 * It contains the states and wraps below
 * Modal
 * The Burger 
 * The Build Controls
 */
import React, { useState, useEffect, useCallback } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import { useSelector, useDispatch} from 'react-redux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

const burgerBuilder = props => {
    const [showOrderSummary, setshowOrderSummary] = useState(false)

    // used to dispatch the action
    const dispatch = useDispatch();
    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredients(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredients(ingredientName));
    // useCallback for caching function so avoid call back loopings
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onPurchaseInit = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    // use selector to get the store value
    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients]);

    // To activate or deactivate the Order Now button based on the ingredients total count
    const purchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkeys => {
                return ingredients[igkeys];
            })
            .reduce((sum, elr) => {
                return sum + elr;
            }, 0);
        return sum > 0;
    }

    // To check whether the Order Now Button has been clicked or not
    const orderHandler = () => {
        // if authentication is true then modal is shown
        if (isAuthenticated) {
            setshowOrderSummary(true);
        }
        else {
            // To redirect the user to the auth page if not authenticated
            props.history.push('/auth');
            // to set the redirect path once the user successfully sign in in authentication page
            onSetAuthRedirectPath('/checkout');
        }
    }

    // To check whether the Order Now Button has been clicked or not
    const cancelPurchaseHandler = () => {
        setshowOrderSummary(false);
    }

    const purchaseContinueHandler = () => {
        onPurchaseInit()
        props.history.push('/checkout');
    }

    const disabledButton = {
        ...ingredients
    };
    // {salad:true,meat:true,...}
    for (let key in disabledButton) {
        disabledButton[key] = disabledButton[key] <= 0;
    }
    let ordersSummary = null;
    let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
    if (ingredients) {
        burger = (
            <Aux>
                {/* Used to see the Burger with all the ingredients */}
                <Burger ingredients={ingredients} />

                {/* Used to see the controller for adding and removing the ingredients and order now button */}
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientDeleted={onIngredientRemoved}
                    disabledBtn={disabledButton}
                    currentPrice={price}
                    // Call a function when a component renders
                    purchasable={purchaseHandler(ingredients)}
                    ordered={orderHandler}
                    isAuth={isAuthenticated}
                />
            </Aux>
        );
        ordersSummary = <OrderSummary
            ingredients={ingredients}
            purchaseContinue={purchaseContinueHandler}
            purchaseCancel={cancelPurchaseHandler}
            price={price}
        />
    }

    return (
        <Aux>
            {/* Used to see the model and Order Summary within it */}
            {/* The Order summary should only be rendered when the modal is rendered
                Therefore we can improve performance by adding class component lifecycle
                */}
            <Modal show={showOrderSummary} clicked={cancelPurchaseHandler}>
                {ordersSummary}
            </Modal>
            {burger}
        </Aux>
    )

}

// // for getting the slide of state from store as props
// const mapStateToProps = state => {
//     return {
//         ingredients: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// }

// // for redux reducer to get the action
// const mapDispatchToProps = dispatch => {
//     return {
//         // use dispatch here
//         onIngredientAdded: (ingredientName) => dispatch(actions.addIngredients(ingredientName)),
//         onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredients(ingredientName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onPurchaseInit: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// };


// the connect is used to pass the action and use the state as props in the container
export default (WithErrorHandler(burgerBuilder, Axios));