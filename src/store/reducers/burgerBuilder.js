/**
 * Reducer is a fucntion that takes the old state and action and returns the new state based on the action type
 */
import * as actionTypes from '../actions/actionTypes'

// The price of individual ingerdient
const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 10,
    meat: 30,
    bacon: 20
};

// Initial state
const initialState = {
    ingredients: null,
    totalPrice: 5,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // for adding the ingredients
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                // It will create a copy as well as overwrite the old with new value
                ingredients: {
                    ...state.ingredients,
                    // This will assign a new value to the passes property
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }

        // for removing the ingredients
        case actionTypes.DELETE_INGREDIENT:
            return {
                ...state,
                // It will create a copy as well as overwrite the old with new value
                ingredients: {
                    ...state.ingredients,
                    // This will assign a new value to the passes property
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                // ingredients : action.ingredients,
                ingredients : {
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                }
                ,
                error : false
            }
        case actionTypes.SET_INGREDIENTS_FAILED:
            return {
                ...state,
                error : true
            }
        default:
            return state;
    }
}
export default reducer;